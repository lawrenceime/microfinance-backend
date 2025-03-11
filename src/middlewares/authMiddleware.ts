import {Request , Response , NextFunction} from 'express';
import { verifyToken } from '../utils/tokenUtils';

export const authMiddleware = (req:Request , res:Response , next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.body.userId = (decoded as any).userId;
        next();
    } catch(err) {
        res.status(401).json({message:"Invalid token"});
    }
}