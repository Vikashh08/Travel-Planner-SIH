import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { memoryStore } from '../store/memoryStore.js';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'gonomad_secret_jwt_key_2026_super_app';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to verify JWT
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, travelInterests, avatar } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Full Name, Email, and Password are required.' });
    }

    const existingUser = memoryStore.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Password must be hashed using bcrypt (Requirement 4)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      passwordHash,
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      travelInterests: travelInterests || ['Beaches', 'Culture'],
      createdAt: new Date().toISOString()
    };

    memoryStore.addUser(newUser);

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        avatar: newUser.avatar,
        travelInterests: newUser.travelInterests
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during signup.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = memoryStore.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        travelInterests: user.travelInterests
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential missing' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = memoryStore.findUserByEmail(email);

    if (!user) {
      // Register new user via Google
      user = {
        id: `usr-${Date.now()}`,
        name: name || 'Google User',
        email,
        phone: '',
        passwordHash: '', // No password for OAuth users
        avatar: picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        travelInterests: ['Beaches', 'Culture'],
        createdAt: new Date().toISOString()
      };
      memoryStore.addUser(user);
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Logged in successfully with Google!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        travelInterests: user.travelInterests
      }
    });
  } catch (err) {
    console.error('Google Auth error:', err);
    res.status(500).json({ error: 'Internal server error during Google authentication.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = memoryStore.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found.' });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      travelInterests: user.travelInterests
    }
  });
});

export default router;
