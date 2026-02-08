import express from 'express';
import passport from 'passport';
import { generateToken } from '../middleware/auth';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken((req as any).user);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Discord OAuth
router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken((req as any).user);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Twitter OAuth
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken((req as any).user);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Local login (for development/testing)
router.post('/login', (req, res) => {
  // In a real app, this would validate credentials against the database
  const { username, password } = req.body;
  
  if (username && password) {
    // Mock user
    const user = {
      id: '1',
      username,
      email: `${username}@example.com`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const token = generateToken(user);
    res.json({ token, user });
  } else {
    res.status(400).json({ error: 'Username and password required' });
  }
});

// Registration endpoint
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (username && email && password) {
    // Mock user creation
    const user = {
      id: '2',
      username,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const token = generateToken(user);
    res.json({ token, user });
  } else {
    res.status(400).json({ error: 'Username, email, and password required' });
  }
});

export default router;