// Type definitions for Express Request object
declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; 
      query?: any;
    }
  }
}