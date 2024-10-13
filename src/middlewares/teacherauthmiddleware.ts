
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Secret key (should be in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'MYsuperSECRETpassword';

export function AuthTeacher(req: Request, res: Response, next: NextFunction): any {
  const token = req.cookies.teachertoken;

  if (!token) {
    return res.status(401).json({
      msg: "Cookies not found!!",
    });
  }

  try {
    // Verify the token with the secret key
    const verified = jwt.verify(token, JWT_SECRET);

    if (!verified) {
      return res.status(401).json({
        msg: "Invalid Cookie",
      });
    }

    // Token is valid, proceed to the next middleware or route
    next();
  } catch (error) {
    // If verification fails (e.g., invalid signature or expired token)
    return res.status(403).json({
      msg: "Failed to authenticate token",
      error: error,
    });
  }
}
