# GoNomad Platform

## About Project

GoNomad is a comprehensive, full-stack travel planning platform built specifically to revolutionize how travelers explore India. Designed to cater to both solo backpackers and large family vacations, this platform serves as an all-in-one digital companion for navigating local travel, discovering authentic experiences, and managing trip logistics.

The core of GoNomad is its cutting-edge AI Trip Planner. By leveraging advanced language models, the platform intelligently crafts detailed, day-by-day itineraries based on a traveler's starting city, precise budget, travel duration, specific interests, and transport preferences. Whether you want to explore the majestic heritage forts of Rajasthan, relax on the golden beaches of Goa, or seek adventure in the serene mountains of Manali, the system dynamically curates a personalized journey just for you.

Beyond intelligent planning, GoNomad is deeply integrated with real-time operational features. The platform offers a seamless local transportation booking system that utilizes WebSocket technology for live ride tracking and instantaneous updates. Furthermore, it connects travelers directly with verified local guides, ensuring authentic cultural immersion while providing detailed, user-generated reviews and ratings to maintain high quality and trust. 

The application is built using a modern architecture, featuring a highly responsive React frontend powered by Vite, and a robust Node.js and Express backend. State management is handled through React Contexts, offering a smooth, single-page application experience. With features like Google OAuth integration for secure and frictionless logins, and responsive, glassmorphism-inspired UI components, GoNomad stands out as a premium, intuitive, and highly capable platform for the modern traveler.

---

## Deployment Guide
This guide details how to deploy the **GoNomad Full-Stack Platform** to production for free or low cost using **Render / Railway (Backend + Socket.IO)**, **Vercel / Netlify (Frontend)**, and **MongoDB Atlas (Database)**.

---

## ️ Step 1: Set Up Cloud Database (MongoDB Atlas)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Free Shared Cluster (M0)**.
3. Under **Database Access**, create a database user (e.g. `gonomad_user`) with a strong password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow access from anywhere for cloud deployment).
5. Click **Connect**  **Drivers** to get your connection string:
   ```env
   MONGODB_URI=mongodb+srv://gonomad_user:<password>@cluster0.mongodb.net/gonomad?retryWrites=true&w=majority
   ```

---

##  Step 2: Deploy Backend & WebSockets (Render / Railway / Fly.io)

### Option A: Render.com (Recommended & Free)
1. Push your project to GitHub.
2. Log in to [Render.com](https://render.com) and click **New +**  **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variables**:
   - `PORT`: `5000`
   - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET`: `<Generate a random 64-character secret key>`
   - `GEMINI_API_KEY`: `<Your Gemini API Key>`
   - `WEATHER_API_KEY`: `<Your OpenWeatherMap API Key>`
6. Click **Create Web Service**. Render will deploy your API and provide a live URL (e.g., `https://gonomad-backend.onrender.com`).

---

##  Step 3: Deploy Frontend (Vercel or Netlify)

### Option A: Vercel (Recommended & Fast CDN)
1. In `frontend/src/context/AuthContext.jsx` and `frontend/src/context/BookingContext.jsx`, ensure the API URL points to your live backend domain:
   ```javascript
   export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gonomad-backend.onrender.com/api';
   ```
2. Log in to [Vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://gonomad-backend.onrender.com/api`
   - `VITE_SOCKET_URL`: `https://gonomad-backend.onrender.com`
6. Click **Deploy**. Vercel will build and deploy your app globally (e.g. `https://gonomad.vercel.app`).

---

##  Alternative: Single-Server Unified Deployment (Docker / VPS / Render)

If you prefer serving the frontend directly from the Node.js Express server on a single port:

1. Build frontend dist:
   ```bash
   cd frontend && npm run build
   ```
2. Configure `backend/server.js` to serve static Vite assets:
   ```javascript
   import path from 'path';
   import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   app.use(express.static(path.join(__dirname, '../frontend/dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
   });
   ```
3. Deploy the combined repository to any VPS (DigitalOcean, AWS EC2, Hetzner) using Docker or `pm2`:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "gonomad"
   ```

---

##  Deployment Checklist

- [ ] MongoDB Atlas cluster created & network access set to `0.0.0.0/0`.
- [ ] Backend environment variables (`JWT_SECRET`, `MONGODB_URI`, `GEMINI_API_KEY`) populated.
- [ ] CORS origin in `backend/server.js` allowing your production frontend URL.
- [ ] Socket.IO client configured with production WebSocket URL.
- [ ] Verified live SSL (`https://`) on both frontend and backend domains.
