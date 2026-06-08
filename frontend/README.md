# Frontend - Resume Roast Coach

React-based frontend for the Resume Roast Coach application.

## Features
- File upload for resume processing
- Real-time feedback display
- Responsive UI with Tailwind CSS
- Accessibility with Radix UI components

## Directory Structure
```
frontend/
├── components/
│   ├── ui/ (Reusable UI components)
│   └── (Feature components)
├── routes/
│   ├── __root.tsx (Root layout)
│   └── index.tsx (Homepage)
├── hooks/ (Custom React hooks)
├── lib/ (Utilities)
├── styles.css (Global styles)
└── package.json
```

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Technologies
- React 19
- TanStack Router
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod (Validation)

## Deployment
Frontend builds to static files. Configure your deployment platform to serve the `dist` folder.