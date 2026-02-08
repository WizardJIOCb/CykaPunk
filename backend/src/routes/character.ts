import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { Character } from '../shared/types';

const router = express.Router();

// Get user's character
router.get('/', authenticateToken, (req, res) => {
  // In a real app, this would fetch from the database
  const character: Character = {
    id: 'char_1',
    userId: (req as any).user.id,
    name: (req as any).user.username,
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    speed: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json({ character });
});

// Update character (equip items, etc.)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // In a real app, this would update the database
  const character: Character = {
    id,
    userId: (req as any).user.id,
    name: (req as any).user.username,
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    speed: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Apply updates
  Object.assign(character, updates);
  character.updatedAt = new Date();
  
  res.json({ character });
});

// Level up character
router.post('/:id/level-up', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  // In a real app, this would calculate level up logic and update database
  const character: Character = {
    id,
    userId: (req as any).user.id,
    name: (req as any).user.username,
    level: 2, // Level up
    experience: 100,
    health: 110,
    maxHealth: 110,
    attack: 12,
    defense: 6,
    speed: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json({ character, message: 'Character leveled up!' });
});

export { router as characterRoutes };
