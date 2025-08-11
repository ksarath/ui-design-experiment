# Manuscript Upload UI

A modern, responsive web application built with Next.js for uploading manuscripts for academic review. Features a beautiful drag-and-drop interface with smooth animations and professional design.

## Features

- 🎯 **Modern Upload Interface**: Sleek drag-and-drop file upload with visual feedback
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI**: Gradient backgrounds, smooth animations, and professional styling
- 📄 **File Management**: Support for multiple file formats (PDF, DOC, DOCX, TXT, RTF)
- ⚡ **Real-time Feedback**: Upload progress, success states, and error handling
- 🔒 **Secure Upload**: Built with security best practices in mind
- ♿ **Accessible**: Designed with accessibility standards for all users

## Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Heroicons
- **Runtime**: React 19

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
└── components/
    └── ManuscriptUploader.tsx  # Main upload component
```

## Usage

1. **Upload Files**: Drag and drop manuscript files onto the upload area or click "Choose Files"
2. **File Review**: Review selected files in the file list with size and type information
3. **Submit**: Click "Submit for Review" to upload files for academic review
4. **Track Progress**: Monitor upload progress with visual indicators

## Supported File Types

- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Rich Text Format (.rtf)
- Plain Text (.txt)

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Follow the TypeScript and React best practices
2. Use Tailwind CSS for styling
3. Ensure responsive design
4. Test on multiple devices and browsers
5. Maintain accessibility standards

## License

This project is built for academic manuscript review purposes.
