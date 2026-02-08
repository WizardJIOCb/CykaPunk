import express from 'express';
import passport from 'passport';
import { UserService, UserRegistrationData, UserLoginData } from '../services/userService';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = UserService.generateToken((req as any).user.id.toString());
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Discord OAuth
router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    const token = UserService.generateToken((req as any).user.id.toString());
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Twitter OAuth
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    const token = UserService.generateToken((req as any).user.id.toString());
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  }
);

// Local login
router.post('/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const loginData: UserLoginData = { email, password };
    const result = await UserService.login(loginData);
    
    const token = UserService.generateToken(result.user.id.toString());
    res.json({ token, user: result.user, character: result.character });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
  }
});

// Registration endpoint
router.post('/register', async (req, res): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password required' });
    }
    
    const registrationData: UserRegistrationData = { username, email, password };
    const result = await UserService.register(registrationData);
    
    const token = UserService.generateToken(result.user.id.toString());
    res.json({ token, user: result.user, character: result.character });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
});

// Token verification endpoint
router.get('/verify', async (req, res): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    const user = await UserService.verifyToken(token);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Get character data (using the same storage approach)
    const character = (UserService as any).charactersStorage.find((c: any) => c.userId === user.id);
    
    res.json({ user, character });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Token verification failed' });
  }
});

export default router;