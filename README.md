# 🔥 Resume Roast Coach

> An AI-powered resume analysis tool that provides constructive feedback and actionable insights to help you improve your resume and land your dream job.

## 📋 Overview

**Resume Roast Coach** is a modern web application that leverages artificial intelligence to analyze resumes and provide detailed, constructive feedback. Upload your resume, and get instant insights on formatting, content, keywords, ATS (Applicant Tracking System) compatibility, and overall impact.

Whether you're a job seeker looking to stand out or a hiring manager wanting to understand resume quality, Resume Roast Coach is your AI-powered career companion.

## ✨ Features

- 📄 **Resume Upload & Analysis** - Upload PDF or DOCX resumes for AI-powered analysis
- 🤖 **AI-Powered Feedback** - Get detailed, constructive feedback powered by OpenAI
- 🎯 **ATS Optimization** - Receive suggestions to improve Applicant Tracking System compatibility
- 📊 **Comprehensive Scoring** - Get scores across multiple dimensions (content, formatting, keywords, impact)
- ✏️ **Actionable Insights** - Specific, actionable recommendations to improve your resume
- 🎨 **Modern UI** - Clean, intuitive interface built with React and Tailwind CSS
- ⚡ **Fast & Responsive** - Built with TanStack Start for optimal performance
- 🔒 **Secure** - Process your data with privacy in mind

## 🛠️ Tech Stack

### Frontend (Vercel)
- **React 19** - UI framework
- **TanStack Start** - Full-stack meta-framework
- **TanStack Router** - Type-safe routing
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Unstyled, accessible components
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation

### Backend (Render)
- **Node.js** - Runtime environment
- **Express.js** - Backend framework
- **TypeScript** - Type safety

### AI & Services
- **Vercel AI SDK** - OpenAI integration
- **OpenAI API** - GPT-powered analysis
- **Mammoth** - DOCX file parsing
- **pdf-parse** - PDF file parsing

### Dev Tools
- **Vite** - Build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- OpenAI API key
- GitHub account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alakh-gupta/resume-roast-coach.git
   cd resume-roast-coach
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open in your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development
bun run dev              # Start development server

# Build
bun run build            # Build for production
bun run build:dev        # Build in development mode

# Preview
bun run preview          # Preview production build locally

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format code with Prettier
```

## 📁 Project Structure

```
resume-roast-coach/
├── src/
│   ├── routes/           # TanStack Router routes (file-based routing)
│   ├── components/       # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and helpers
│   ├── router.tsx       # Router setup
│   ├── start.ts         # App entry point
│   └── styles.css       # Global styles
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── vercel.json          # Vercel frontend deployment config
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## 🔄 How It Works

1. **Upload Resume** - User uploads a PDF or DOCX resume on Vercel frontend
2. **Send to Backend** - Frontend sends file to your Render backend
3. **Parse Content** - Backend extracts text from the document
4. **AI Analysis** - Backend calls OpenAI GPT to analyze resume
5. **Generate Feedback** - Detailed, constructive feedback is generated
6. **Display Results** - Backend returns results to frontend for display

## 📊 Analysis Includes

- **Resume Structure** - Section organization and flow
- **Content Quality** - Writing clarity and impact
- **Keywords & Skills** - Industry relevance and ATS optimization
- **Formatting** - Visual appearance and readability
- **Actionable Recommendations** - Specific improvements to make

---

## 🏗️ Architecture: Separate Frontend & Backend

Your application has a **decoupled architecture**:

```
┌──────────────────────────┐
│   FRONTEND (Vercel)      │
│ - React + TanStack Start │
│ - Upload Resume UI       │
│ - Display Analysis       │
│ - User Interface         │
└────────────┬─────────────┘
             │ HTTPS API Calls
             │ CORS Enabled
             ↓
┌──────────────────────────┐
│   BACKEND (Render)       │
│ - Express.js Server      │
│ - File Processing        │
│ - OpenAI Integration     │
│ - Resume Analysis        │
└──────────────────────────┘
```

---

## 🚀 BACKEND DEPLOYMENT ON RENDER

### Complete Step-by-Step Guide

#### **Step 1: Create Backend Project Structure**

Create a new folder for your backend:

```bash
# Create backend directory
mkdir resume-roast-coach-backend
cd resume-roast-coach-backend

# Initialize Node.js project
npm init -y

# Install required dependencies
npm install express cors dotenv axios
npm install @ai-sdk/openai ai mammoth pdf-parse multer

# Install development dependencies
npm install -D typescript ts-node @types/express @types/node nodemon
npm install -D @types/mammoth @types/pdf-parse
```

#### **Step 2: Create Backend Application Files**

**Create `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Create `src/index.ts`:**

```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import mammoth from 'mammoth';
import * as pdfParse from 'pdf-parse';
import multer from 'multer';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS for Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://resume-roast-coach.vercel.app'
  ],
  credentials: true
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

// ==================== API ROUTES ====================

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'Backend is running ✅',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Resume analysis endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({
        error: 'Resume text is required and must be a string'
      });
    }

    if (resumeText.trim().length === 0) {
      return res.status(400).json({
        error: 'Resume text cannot be empty'
      });
    }

    console.log('📄 Analyzing resume...');

    // Call OpenAI API with streaming for better performance
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `You are an expert resume reviewer. Analyze the following resume and provide comprehensive constructive feedback.

RESUME:
${resumeText}

Please provide analysis in the following structure:
1. **Overall Assessment**: Brief overview of the resume
2. **Strengths**: What works well
3. **Areas for Improvement**: Specific areas to enhance
4. **ATS Optimization**: Suggestions for Applicant Tracking Systems
5. **Keywords to Add**: Industry-relevant keywords missing
6. **Actionable Steps**: Concrete improvements to make
7. **Resume Score**: Rate out of 100

Be constructive, specific, and actionable in your feedback.`,
      maxTokens: 2000,
      temperature: 0.7,
    });

    console.log('✅ Analysis complete');

    return res.json({
      success: true,
      feedback: text,
      timestamp: new Date().toISOString(),
      tokens_used: text.split(' ').length
    });

  } catch (error: any) {
    console.error('❌ Analysis error:', error.message);
    return res.status(500).json({
      error: 'Failed to analyze resume',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// File upload endpoint (PDF or DOCX)
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const file = req.file;
    const fileType = file.mimetype.includes('pdf') ? 'pdf' : 'docx';

    let resumeText = '';

    console.log(`📂 Processing ${fileType.toUpperCase()} file...`);

    if (fileType === 'pdf') {
      // Parse PDF
      try {
        const data = await pdfParse(file.buffer);
        resumeText = data.text;
      } catch (error) {
        console.error('PDF parsing error:', error);
        return res.status(400).json({
          error: 'Failed to parse PDF. Make sure it contains text-based content.'
        });
      }
    } else if (fileType === 'docx') {
      // Parse DOCX
      try {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        resumeText = result.value;
      } catch (error) {
        console.error('DOCX parsing error:', error);
        return res.status(400).json({
          error: 'Failed to parse DOCX file.'
        });
      }
    } else {
      return res.status(400).json({
        error: 'Unsupported file type. Use PDF or DOCX.'
      });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({
        error: 'Could not extract text from the file. Ensure it contains readable text.'
      });
    }

    console.log(`✅ File processed. Extracted ${resumeText.length} characters`);

    return res.json({
      success: true,
      resumeText: resumeText.trim(),
      fileType,
      characterCount: resumeText.length,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Upload error:', error.message);
    return res.status(500).json({
      error: 'Failed to process file',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

// ==================== SERVER STARTUP ====================

const PORT = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Resume Roast Coach Backend Started 🚀 ║
║════════════════════════════════════════║
║  Server: http://localhost:${PORT}           ║
║  Endpoints:                            ║
║    - GET  /api/health                  ║
║    - POST /api/upload                  ║
║    - POST /api/analyze                 ║
╚════════════════════════════════════════╝
  `);
});
```

#### **Step 3: Create Configuration Files**

**Create `.env` file:**

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

**Create `.gitignore` file:**

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

**Update `package.json` with scripts:**

```json
{
  "name": "resume-roast-coach-backend",
  "version": "1.0.0",
  "description": "Backend for Resume Roast Coach",
  "main": "dist/index.js",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["resume", "ai", "analysis"],
  "author": "Alakh Gupta",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.2",
    "ai": "^2.2.0",
    "@ai-sdk/openai": "^0.0.16",
    "mammoth": "^1.6.0",
    "pdf-parse": "^1.1.1",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "ts-node": "^10.9.1",
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.5",
    "@types/multer": "^1.4.7",
    "nodemon": "^3.0.1"
  }
}
```

#### **Step 4: Test Backend Locally**

```bash
# Install dependencies
npm install

# Build
npm run build

# Start development server
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║  Resume Roast Coach Backend Started 🚀 ║
║════════════════════════════════════════║
║  Server: http://localhost:5000        ║
```

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

#### **Step 5: Push Backend to GitHub**

```bash
# Initialize git in backend folder
git init
git add .
git commit -m "Initial backend setup with Express and OpenAI integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-roast-coach-backend.git
git push -u origin main
```

#### **Step 6: Deploy Backend on Render**

**6a. Create Render Account**

1. Go to [render.com](https://render.com)
2. Click **"Sign up"**
3. Sign up with GitHub
4. Authorize Render to access your repositories

**6b. Deploy Service**

1. Click **"New +"** button
2. Select **"Web Service"**
3. Select your `resume-roast-coach-backend` repository
4. Fill in the configuration:

| Field | Value |
|-------|-------|
| **Name** | `resume-roast-coach-backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Starter for production) |

5. Click **"Advanced"** and add environment variables:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `NODE_ENV` | `production` |

6. Click **"Create Web Service"**

Render will start building and deploying. This takes 2-3 minutes.

**Your backend URL will be:**
```
https://resume-roast-coach-backend.onrender.com
```

#### **Step 7: Verify Backend Deployment**

Test the live backend:

```bash
# Health check
curl https://resume-roast-coach-backend.onrender.com/api/health

# Expected response:
# {"status":"Backend is running ✅","timestamp":"...","environment":"production"}
```

---

## 🌐 FRONTEND DEPLOYMENT ON VERCEL

### Frontend Setup & Deployment

#### **Step 1: Update Frontend Environment Variables**

Update your frontend `.env.production` file:

```env
VITE_API_URL=https://resume-roast-coach-backend.onrender.com
```

Update your frontend code to use the API URL:

**Create `src/lib/api.ts`:**

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function uploadResume(file: File): Promise<{ resumeText: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload resume');
  }

  return response.json();
}

export async function analyzeResume(resumeText: string): Promise<{ feedback: string }> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze resume');
  }

  return response.json();
}
```

#### **Step 2: Create Vercel Configuration**

Create `vercel.json` in frontend root:

```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": "other",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": {
      "required": true
    }
  }
}
```

#### **Step 3: Push Frontend to GitHub**

```bash
git add .
git commit -m "Configure frontend for Render backend integration"
git push origin main
```

#### **Step 4: Deploy Frontend on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Find and select `resume-roast-coach`
5. Click **"Import"**
6. In **Environment Variables**, add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://resume-roast-coach-backend.onrender.com`
   - **Environments**: Production, Preview, Development
7. Click **"Deploy"**

**Your frontend URL will be:**
```
https://resume-roast-coach.vercel.app
```

---

## 🔗 Complete Deployment Architecture

```
User Browser
    ↓
Frontend (Vercel)
https://resume-roast-coach.vercel.app
    ↓ HTTPS API Call
    ↓ (Resume file/text)
Backend (Render)
https://resume-roast-coach-backend.onrender.com
    ↓ Process & Analyze
    ↓
OpenAI API
    ↓ Return Analysis
Backend → Frontend
    ↓
User Sees Feedback
```

---

## 🧪 Testing the Complete Setup

### Test Backend (Render)

```bash
# Health check
curl https://resume-roast-coach-backend.onrender.com/api/health

# Response:
{
  "status": "Backend is running ✅",
  "timestamp": "2024-06-08T...",
  "environment": "production"
}
```

### Test Frontend (Vercel)

1. Open: `https://resume-roast-coach.vercel.app`
2. Upload a resume (PDF or DOCX)
3. Click "Analyze"
4. Wait for results
5. See analysis feedback

---

## 🛠️ Development Workflow

### Local Development

**Terminal 1 - Frontend:**
```bash
cd resume-roast-coach
bun run dev
# Frontend at http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd resume-roast-coach-backend
npm run dev
# Backend at http://localhost:5000
```

### Production Deployment

1. **Backend**: Push to GitHub → Render auto-deploys
2. **Frontend**: Push to GitHub → Vercel auto-deploys

---

## 🚨 Troubleshooting

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**: Backend already configured for frontend origin. Verify in `src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://resume-roast-coach.vercel.app'
  ],
  credentials: true
}));
```

### Backend Not Responding

**Error**: `Cannot connect to https://resume-roast-coach-backend.onrender.com`

**Solution**:
1. Check Render deployment status
2. View logs in Render dashboard
3. Verify OpenAI API key is set
4. Ensure backend is in "Running" state

### API Key Error

**Error**: `OPENAI_API_KEY is not set`

**Solution**:
1. Go to Render dashboard
2. Click your service
3. Go to **Environment** tab
4. Verify `OPENAI_API_KEY` is set
5. Redeploy if needed

### File Upload Fails

**Error**: `Failed to parse PDF/DOCX`

**Solution**:
1. Ensure file is valid PDF or DOCX
2. File should contain text (not scanned image)
3. Check file size < 25MB
4. View Render logs for details

---

## 📊 Monitoring

### Frontend (Vercel)
- Dashboard → Analytics
- Monitor requests, response times, errors

### Backend (Render)
- Dashboard → Service Logs
- Monitor API calls, errors, performance

---

## 📝 File Upload Support

- **PDF Files** (.pdf) - Maximum 25MB
- **Word Documents** (.docx) - Maximum 25MB

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

For support, email [alakhg2005@gmail.com](mailto:alakhg2005@gmail.com) or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Support for more file formats (RTF, HTML)
- [ ] Download feedback as PDF
- [ ] Resume template suggestions
- [ ] Comparison with job descriptions
- [ ] Multi-language support
- [ ] Cover letter analysis
- [ ] Interview preparation tips
- [ ] Analytics dashboard for hiring managers
- [ ] User authentication and saved resumes

## 👨‍💻 Author

**Alakh Gupta**
- GitHub: [@Alakh-gupta](https://github.com/Alakh-gupta)
- Email: alakhg2005@gmail.com

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using React, TanStack Start, Vercel, Render, and OpenAI**
