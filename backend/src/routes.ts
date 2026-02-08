import { Router } from 'express';
import authRoutes from './routes/auth';

export function setupRoutes(app: any) {
  const router = Router();
  
  // Mount auth routes
  router.use('/api/auth', authRoutes);
  
  // Health check
  router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  
  app.use('/', router);
}