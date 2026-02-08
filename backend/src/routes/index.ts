import express from 'express';
import { authenticateToken } from '../middleware/auth';

import { userRoutes } from './user';
import { characterRoutes } from './character';
import { itemRoutes } from './item';
import { battleRoutes } from './battle';
import { chatRoutes } from './chat';

export const setupRoutes = (app: express.Application) => {
  app.use('/api/users', authenticateToken, userRoutes);
  app.use('/api/characters', authenticateToken, characterRoutes);
  app.use('/api/items', authenticateToken, itemRoutes);
  app.use('/api/battles', authenticateToken, battleRoutes);
  app.use('/api/chat', authenticateToken, chatRoutes);
  
  // Public routes
  app.use('/api/auth', require('./auth').default);
  
  // Health check
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  
  // Catch-all for undefined routes
  app.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};
