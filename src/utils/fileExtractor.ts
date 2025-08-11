export interface ExtractedText {
  content: string;
  lines: string[];
  metadata?: {
    fileName: string;
    fileType: string;
    pageCount?: number;
  };
}

export async function extractTextFromFile(file: File): Promise<ExtractedText> {
  const fileType = file.type || getFileTypeFromName(file.name);
  
  switch (fileType) {
    case 'application/pdf':
      return await extractTextFromPDF(file);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
      return await extractTextFromWord(file);
    case 'text/plain':
      return await extractTextFromPlainText(file);
    default:
      // For unsupported file types, try to read as plain text
      return await extractTextFromPlainText(file);
  }
}

async function extractTextFromPDF(file: File): Promise<ExtractedText> {
  try {
    // For demo purposes, we'll simulate PDF text extraction
    // In a real application, you'd use a PDF parsing library or server-side processing
    const samplePdfText = `Title: Impact of Digital Learning Platforms on Student Engagement

Abstract
This study examines the effectiveness of digital learning platforms in enhancing student
engagement in higher education. Through a comprehensive analysis of student performance
data, we aimed to understand the correlation between digital tool usage and academic
outcomes. The study involved 150 undergraduate students across three universities.

Introduction
Digital learning has transformed the educational landscape significantly over the past
decade. Educational institutions are increasingly adopting technology-enhanced learning
environments to improve student outcomes and engagement levels.

Methodology
Participants were recruited from local universities using convenience sampling methods.
A total of 50 participants were recruited for this study.
All participants provided informed consent before participating in the study.

Results
In our comprehensive analysis of the experimental data, we observed multiple instances
where the treatment group The results shows significant improvement compared to the
control group. This improvement was consistent across all measured parameters.

Discussion
These findings align with previous research in the field. The implications of these
results are discussed below. Table 2 shows the demographic characteristics.
Age ranged from 18 to 65 years (M = 34.2, SD = 12.1). Gender distribution was
balanced across groups.

Previous studies have shown varying results. However, recent meta-analyses suggest
Smith et al (2023) found similar results. This consistency across studies strengthens
the evidence for this phenomenon.

Limitations
The findings of this study contribute to the literature by providing new insights
into the phenomenon. This study has some limitations. Despite these limitations,
the results provide valuable insights for future research.

Statistical Analysis
Statistical analyses were performed using SPSS 28. Alpha level was set at 0.05 for
all tests. Significant differences were found between groups. Post-hoc analyses
revealed specific group differences. Effect sizes were calculated using Cohen's d.`;

    const lines = samplePdfText.split('\n').filter(line => line.trim() !== '');
    
    return {
      content: samplePdfText,
      lines,
      metadata: {
        fileName: file.name,
        fileType: 'PDF',
        pageCount: 1
      }
    };
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF file');
  }
}

async function extractTextFromWord(file: File): Promise<ExtractedText> {
  try {
    // For Word documents, we'll use a client-side approach
    // This is a simplified version - in production, you might want to use a server-side solution
    const arrayBuffer = await file.arrayBuffer();
    
    // For now, we'll use mammoth library (you might need to add it to dependencies)
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer });
    const lines = result.value.split('\n').filter(line => line.trim() !== '');
    
    return {
      content: result.value,
      lines,
      metadata: {
        fileName: file.name,
        fileType: 'Word Document'
      }
    };
  } catch (error) {
    console.error('Error extracting Word text:', error);
    // Fallback to plain text if mammoth fails
    return await extractTextFromPlainText(file);
  }
}

async function extractTextFromPlainText(file: File): Promise<ExtractedText> {
  try {
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return {
      content: text,
      lines,
      metadata: {
        fileName: file.name,
        fileType: 'Text Document'
      }
    };
  } catch (error) {
    console.error('Error reading text file:', error);
    throw new Error('Failed to read text file');
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
    case 'txt':
      return 'text/plain';
    case 'rtf':
      return 'application/rtf';
    default:
      return 'text/plain';
  }
}
