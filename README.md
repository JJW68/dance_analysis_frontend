# DanceAI - AI-Powered Dance Feedback

Welcome to DanceAI! This is a modern, responsive web application designed to help dancers improve their technique. Users can upload a video of their dance cover along with the original dance video. The application then provides AI-powered feedback with precise pose analysis, highlighting areas for improvement.

This project was built with **React**, **TypeScript**, and **Vite**.

## ✨ Key Features

*   **Responsive Design**: A beautiful and modern UI that works on all screen sizes.
*   **Difficulty Selection**: Choose from Beginner, Intermediate, or Advanced levels for tailored analysis.
*   **Video Upload**: Simple drag-and-drop interface for uploading dance videos.
*   **Side-by-Side Comparison**: View the original and your cover video next to each other.
*   **Pose Skeleton Overlay**: A visual guide (skeleton) is overlaid on the videos to show correct posture.
*   **Keyframe Analysis**: See a breakdown of key moments in the dance with specific feedback.
*   **AI Suggestions**: Get actionable tips to improve your form.
*   **Fullscreen Mode**: Expand the video player for a more detailed view.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (which comes with Node.js) installed on your system.

### Installation & Setup

1.  **Clone the repository** to your local machine.
2.  **Navigate into the project directory**:
    ```sh
    cd dance-ai-upload
    ```
3.  **Install the dependencies**:
    ```sh
    npm install
    ```
    If you encounter any peer dependency issues, you can try:
    ```sh
    npm install --legacy-peer-deps
    ```

### Running the Development Server

Once the dependencies are installed, you can start the local development server:

```sh
npm run dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**. The server will automatically reload when you make changes to the code.

## 🛠️ Available Scripts

In the project directory, you can run the following commands:

*   `npm run dev`: Starts the development server.
*   `npm run build`: Bundles the app for production.
*   `npm run lint`: Lints the source code to catch errors.
*   `npm run preview`: Serves the production build locally.

## 💻 Technologies Used

*   **Vite**: Next-generation frontend tooling.
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **React Dropzone**: For the file upload functionality.
*   **Google Fonts**: For custom typography.
*   **CSS-in-JS**: For component-level styling.
