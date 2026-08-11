import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import guideRoutes from './routes/guideRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import utilityRoutes from './routes/utilityRoutes.js';
import { setupSocketIO } from './services/socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Setup Socket.IO for real-time driver tracking (Requirements 40 & 41)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
setupSocketIO(io);

// Mount API Routes (Requirement 39)
app.use('/api/auth', authRoutes);
app.use('/api', destinationRoutes);
app.use('/api', rideRoutes);
app.use('/api', guideRoutes);
app.use('/api', tripRoutes);
app.use('/api', reviewRoutes);
app.use('/api', aiRoutes);
app.use('/api', utilityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'GoNomad Travel Super App Backend',
    timestamp: new Date().toISOString()
  });
});

// Root API endpoint for browser visitors
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the GoNomad API Server! 🚀',
    status: 'Running',
    docs: 'This server provides backend services. Please visit your Vercel frontend URL to use the application.'
  });
});

// Production Unified Frontend Static Serving
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log('📦 Serving production frontend bundle from /frontend/dist');
}

// Optional MongoDB Connection with graceful fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gonomad';
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => console.log('✅ Connected to MongoDB successfully.'))
  .catch((err) => {
    console.warn('⚠️ MongoDB not connected, operating with high-speed in-memory store fallback:', err.message);
  });

server.listen(PORT, () => {
  console.log(`🚀 GoNomad Unified Production Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO server listening on port ${PORT}`);
});
