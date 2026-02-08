import express from 'express';
import { UserService, UserRegistrationData, UserLoginData } from '../services/userService';

const router = express.Router();

// Local login
router.post('/login', async (req, res) => {
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
router.post('/register', async (req, res) => {
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

export default router;