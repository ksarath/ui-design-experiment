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
  try {
    console.log('Starting text extraction for:', file.name, 'Type:', file.type, 'Size:', file.size);
    
    // Create FormData to send file to backend
    const formData = new FormData();
    formData.append('file', file);

    // Call backend API for text extraction
    const response = await fetch('/api/extract-text', {
      method: 'POST',
      body: formData,
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Failed to extract text';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        if (errorData.details) {
          console.error('API Error details:', errorData.details);
          errorMessage += ` (${errorData.details})`;
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const extractedData = await response.json();
    
    console.log('Successfully extracted text from backend:', {
      fileName: extractedData.metadata?.fileName,
      lineCount: extractedData.lines?.length,
      fileType: extractedData.metadata?.fileType
    });

    return extractedData;

  } catch (error) {
    console.error('Error calling backend text extraction:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to extract text from file';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.log('Falling back to sample content due to error:', errorMessage);
    
    // Fallback to sample content if backend extraction fails
    const fallbackText = generateFallbackContent(file.name, errorMessage);
    
    return {
      content: fallbackText.content,
      lines: fallbackText.lines,
      metadata: {
        fileName: file.name,
        fileType: 'Sample Content (Extraction Failed)',
        pageCount: 1
      }
    };
  }
}

function generateFallbackContent(fileName: string, errorMessage?: string) {
  const sampleText = `Title: Impact of Digital Learning Platforms on Student Engagement

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
revealed specific group differences. Effect sizes were calculated using Cohen's d.

Note: This is sample content shown because text extraction from "${fileName}" failed.
${errorMessage ? `Error: ${errorMessage}` : ''}`;

  const lines = sampleText.split('\n').filter(line => line.trim() !== '');
  
  return {
    content: sampleText,
    lines
  };
}
