import { Request, Response, NextFunction } from 'express';

// Mock authentication middleware for development
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // In development, allow all requests to pass through
  // In production, implement proper JWT verification
  next();
};

// Mock authorization middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // In development, allow all requests to pass through
  // In production, check if user is authenticated
  next();
};
