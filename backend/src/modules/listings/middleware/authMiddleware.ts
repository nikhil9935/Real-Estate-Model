import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserDocument, userSchema } from '../repositories/userSchema';
interface AuthenticatedRequest extends Request {
  user?: any;
}
const User = mongoose.model<UserDocument>('User', userSchema);
const secretKey = 'alpha-beta-gamma'
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: any) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("AuthToken", token)

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { user: { username: string } };
    console.log("decoded", decoded)

    const user = await User.findOne({ username: decoded.user.username });
    console.log("user", user)
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }
    console.log(req.user)
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
