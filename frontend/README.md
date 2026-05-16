
# SETU Student Services App UI

This is the frontend for the SETU Student Services project. The original UI came from the Figma design at [https://www.figma.com/design/AdrkX2LB01oYYL9a8d5A0X/SETU-Student-Services-App-UI](https://www.figma.com/design/AdrkX2LB01oYYL9a8d5A0X/SETU-Student-Services-App-UI).

## Local development

### Backend

```bash
cd ../backend
npm install
npm run dev
```

### Frontend

```bash
npm install
cp .env.example .env
npm run dev
```

The frontend expects the lecture API at:

```bash
VITE_LECTURE_API_URL=http://localhost:4000
```

## Deployment

Recommended setup:

- frontend: `Vercel`
- backend: `Render`

### 1. Deploy the backend on Render

Create a new Web Service using the `starter/backend` folder.

Use:

- Build command: `npm install`
- Start command: `npm start`

Render should provide a public backend URL such as:

```bash
https://your-backend.onrender.com
```

### 2. Deploy the frontend on Vercel

Create a new project using the `starter/frontend` folder.

Set this environment variable in Vercel:

```bash
VITE_LECTURE_API_URL=https://your-backend.onrender.com
```

Use the default Vite build settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Notes

- The frontend uses `VITE_LECTURE_API_URL` for lecture content, PDFs, and past exam files.
- The backend must be deployed first so the frontend can point to the correct public API URL.
  
