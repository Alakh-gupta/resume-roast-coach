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

### Frontend
- **React 19** - UI framework
- **TanStack Start** - Full-stack meta-framework
- **TanStack Router** - Type-safe routing
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Unstyled, accessible components
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation

### Backend
- **Nitro** - Server framework
- **Node.js** - Runtime environment

### AI & Services
- **Vercel AI SDK** - OpenAI integration
- **OpenAI API** - GPT-powered analysis
- **Mammoth** - DOCX file parsing
- **UnPDF** - PDF file parsing

### Dev Tools
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- OpenAI API key

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
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
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
│   ├── server.ts        # Server configuration
│   ├── router.tsx       # Router setup
│   ├── start.ts         # App entry point
│   └── styles.css       # Global styles
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## 🔄 How It Works

1. **Upload Resume** - User uploads a PDF or DOCX resume
2. **Parse Content** - Application extracts text from the document
3. **AI Analysis** - OpenAI GPT analyzes the resume against best practices
4. **Generate Feedback** - Detailed, constructive feedback is generated
5. **Display Results** - Results are presented in an easy-to-understand format

## 📊 Analysis Includes

- **Resume Structure** - Section organization and flow
- **Content Quality** - Writing clarity and impact
- **Keywords & Skills** - Industry relevance and ATS optimization
- **Formatting** - Visual appearance and readability
- **Actionable Recommendations** - Specific improvements to make

## 🌐 Deployment on Vercel

### Step-by-Step Guide

#### 1. **Prepare Your Repository**

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Initial commit: Resume Roast Coach"
git push origin main
```

#### 2. **Create a Vercel Account**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (recommended)
3. Authorize Vercel to access your GitHub repositories

#### 3. **Import Your Project**

1. On your Vercel dashboard, click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Search for and select `resume-roast-coach`
4. Click **"Import"**

#### 4. **Configure Environment Variables**

1. You'll see the **"Configure Project"** page
2. Scroll to **"Environment Variables"**
3. Add your environment variables:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
4. Select environments: Select all (Production, Preview, Development)
5. Click **"Add"**

#### 5. **Deploy**

1. Click the **"Deploy"** button
2. Wait for the build to complete (2-5 minutes)
3. Once deployed, you'll get a live URL like: `https://resume-roast-coach.vercel.app`

#### 6. **Verify Deployment**

- Click the URL to visit your deployed application
- Test the resume upload functionality
- Verify that AI analysis works correctly

### Vercel Configuration Files

Create a `vercel.json` file in the root directory for additional configuration:

```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": "other",
  "outputDirectory": "dist"
}
```

### Environment Variables Setup

The following environment variables are required on Vercel:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key - **Required** |

**Get your OpenAI API Key:**
1. Visit [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Click **"Create new secret key"**
3. Copy and save the key securely
4. Add to Vercel environment variables

### Continuous Deployment

Once deployed, your project will automatically redeploy when you:
- Push changes to the `main` branch
- Create a pull request (Preview deployment)

### Custom Domain (Optional)

1. Go to your project on Vercel
2. Navigate to **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Monitoring & Logs

- **View Logs**: Project → **"Deployments"** → Click deployment → **"View Logs"**
- **Performance**: Project → **"Analytics"** for real-time metrics
- **Error Tracking**: Check function logs for server-side errors

### Troubleshooting

**Build fails with "out of memory":**
- Vercel has sufficient resources; check your build scripts

**API key not working:**
- Verify `OPENAI_API_KEY` is set in Vercel Environment Variables
- Ensure the key has API access enabled in OpenAI dashboard

**CORS issues:**
- Check that your API routes properly handle CORS headers
- TanStack Start with Nitro handles this automatically

**Function timeout:**
- Default timeout is 10 seconds; increase if needed in `vercel.json`

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

## 👨‍💻 Author

**Alakh Gupta**
- GitHub: [@Alakh-gupta](https://github.com/Alakh-gupta)
- Email: alakhg2005@gmail.com

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using React, TanStack Start, Vercel, and OpenAI**
