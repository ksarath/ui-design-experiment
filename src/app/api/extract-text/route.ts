import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime for officeparser compatibility
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('Received request at extract-text API');
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('Received file:', file?.name, file?.type, file?.size);

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = file.name;
    const fileType = file.type || getFileTypeFromName(fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Processing file with officeparser:', {
      fileName,
      fileType,
      bufferSize: buffer.length
    });

    let extractedText: string;
    let pageCount: number | undefined;

    try {
      // Use officeparser for all document types with dynamic import
      console.log('Starting officeparser extraction...');
      
      // Dynamic import to avoid module loading issues
      const { parseOfficeAsync } = await import('officeparser');
      
      // Set up environment for officeparser
      process.env.PDFJS_DISABLE_WORKER = 'true';
      
      const data = await parseOfficeAsync(buffer);
      
      if (typeof data === 'string') {
        extractedText = data;
      } else if (data && typeof data === 'object') {
        // Handle different possible return formats from officeparser
        extractedText = String((data as any).data || data);
      } else {
        extractedText = String(data || '');
      }
      
      console.log('Document parsed successfully with officeparser, text length:', extractedText.length);
      
      // For PDFs, try to estimate page count based on content
      if (fileType === 'application/pdf') {
        // Rough estimation: assume average 500 characters per page
        pageCount = Math.max(1, Math.ceil(extractedText.length / 500));
      }
      
    } catch (error) {
      console.error('Officeparser extraction error:', error);
      
      // Try alternative parsing methods based on file type
      try {
        switch (fileType) {
          case 'application/pdf':
            console.log('Trying pdf-parse as fallback for PDF...');
            const pdfParse = (await import('pdf-parse')).default;
            const pdfData = await pdfParse(buffer);
            extractedText = pdfData.text;
            pageCount = pdfData.numpages;
            console.log('PDF parsed with pdf-parse fallback, pages:', pageCount);
            break;
            
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          case 'application/msword':
            console.log('Trying mammoth as fallback for Word document...');
            const mammoth = await import('mammoth');
            const wordResult = await mammoth.extractRawText({ arrayBuffer });
            extractedText = wordResult.value;
            console.log('Word document parsed with mammoth fallback');
            break;
            
          case 'text/plain':
          case 'application/rtf':
            console.log('Using text decoder for plain text...');
            const decoder = new TextDecoder('utf-8');
            extractedText = decoder.decode(arrayBuffer);
            console.log('Plain text parsed successfully');
            break;
            
          default:
            // Try as plain text as last resort
            console.log('Trying plain text decoder as last resort...');
            const textDecoder = new TextDecoder('utf-8');
            extractedText = textDecoder.decode(arrayBuffer);
            if (!extractedText.trim()) {
              throw new Error(`Unsupported file type: ${fileType}`);
            }
            console.log('File parsed as plain text');
        }
      } catch (fallbackError) {
        console.error('All parsing methods failed:', fallbackError);
        return NextResponse.json({ 
          error: 'Failed to parse document with any available method', 
          details: `Primary error: ${error instanceof Error ? error.message : 'Unknown'}. Fallback error: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown'}`,
          fileType,
          fileName
        }, { status: 500 });
      }
    }

    console.log('Starting text cleanup...');
    // Clean up the text and split into lines
    const cleanText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();

    const lines = cleanText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    console.log('Text processed successfully:', {
      originalLength: extractedText.length,
      cleanedLength: cleanText.length,
      lineCount: lines.length
    });

    const response = {
      content: cleanText,
      lines,
      metadata: {
        fileName,
        fileType: getFileTypeDisplayName(fileType),
        pageCount
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Text extraction error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function getFileTypeFromName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'odt':
      return 'application/vnd.oasis.opendocument.text';
    case 'ods':
      return 'application/vnd.oasis.opendocument.spreadsheet';
    case 'odp':
      return 'application/vnd.oasis.opendocument.presentation';
    case 'txt':
      return 'text/plain';
    case 'rtf':
      return 'application/rtf';
    default:
      return 'text/plain';
  }
}

function getFileTypeDisplayName(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'Word Document';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'Excel Spreadsheet';
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'PowerPoint Presentation';
    case 'application/vnd.oasis.opendocument.text':
      return 'OpenDocument Text';
    case 'application/vnd.oasis.opendocument.spreadsheet':
      return 'OpenDocument Spreadsheet';
    case 'application/vnd.oasis.opendocument.presentation':
      return 'OpenDocument Presentation';
    case 'text/plain':
      return 'Text Document';
    case 'application/rtf':
      return 'RTF Document';
    default:
      return 'Document';
  }
}
