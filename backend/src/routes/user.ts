import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

// Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  const { username, email } = req.body;
  const user = (req as any).user;
  
  // In a real app, this would update the database
  user.username = username || user.username;
  user.email = email || user.email;
  user.updatedAt = new Date();
  
  res.json({ user });
});

// Get user statistics
router.get('/stats', authenticateToken, (req, res) => {
  // In a real app, this would fetch from the database
  const stats = {
    battlesWon: 5,
    battlesLost: 2,
    itemsCollected: 15,
    achievements: ['First Win', 'Level 10', 'Champion']
  };
  
  res.json({ stats });
});

export { router as userRoutes };