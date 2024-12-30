# AskMyPdf Chatbot Frontend

AskMyPdf Chatbot Frontend is a web-based application that allows users to interact with an AI assistant by uploading PDF documents. The AI processes the content of the documents and provides insights and answers to user queries.

## Overview

The application is built using React and TypeScript, leveraging Vite as the build tool. It utilizes various libraries such as Axios for HTTP requests, React Toastify for notifications, and Tailwind CSS for styling. The architecture follows a component-based structure, promoting reusability and maintainability.

### Application Architecture

- **Components**: The application is divided into reusable components such as `Header`, `ChatMessage`, `ChatInput`, and UI elements like `Button` and `Input`.
- **State Management**: React's `useState` and `useEffect` hooks are used for managing component state and side effects.
- **API Integration**: The application communicates with a backend API for uploading PDF files and processing user queries.
- **Styling**: Tailwind CSS is used for styling the application, providing a utility-first approach to design.

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ai-planet.git
   cd ai-planet
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   Create a `.env` file in the root of the project and add the following environment variable:

   ```
   VITE_API_URL=<your_api_url>
   ```

   Replace `<your_api_url>` with the actual URL of your backend API.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## API Documentation

The application interacts with the following API endpoints:

### Upload PDF

- **Endpoint**: `POST /upload/`
- **Description**: Uploads a PDF file for processing.
- **Request**:
  - FormData containing the file.
- **Response**:
  - `document_id`: ID of the uploaded document.
  - `message`: Success message.

### Ask Question

- **Endpoint**: `POST /question/`
- **Description**: Sends a question to the AI based on the uploaded document.
- **Request**:
  - `document_id`: ID of the document.
  - `question`: The question to ask.
- **Response**:
  - `answer`: The AI's response to the question.

## Backend Code

The backend code for this application is available at [AskMyPDF GitHub Repository](https://github.com/AdityaInnovates/AskMyPDF).
