# Vercel Deployment Instructions

## 1. Backend Deployment (e.g., Vercel, Render, or Railway)
- **Environment Variables**:
  - `MONGO_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: A long random string.
  - `ADMIN_PASSWORD`: Your secret admin passkey.
- **Vercel**: If using Vercel, the `backend/vercel.json` is already configured. Simply push the `backend` folder or set the root directory in Vercel settings.

## 2. Frontend Deployment (Vercel)
- **Environment Variables**:
  - `VITE_API_BASE_URL`: The URL of your deployed backend (e.g., `https://your-backend.vercel.app/api`).
- **Build Settings**:
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`

## 3. Important Notes
- **CORS**: Ensure the backend's `cors` settings include your frontend URL in production for better security.
- **Auth**: The password reset feature is fully operational and saves to the database.
