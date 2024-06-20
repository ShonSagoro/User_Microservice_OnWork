import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWTMiddleware {
    private static JWT_SECRET = process.env.JWT_SECRET;
    private static blacklist: string[] = [];

    public static async GenerateToken(data: any): Promise<string> {
        if (!JWTMiddleware.JWT_SECRET) {
            throw new Error('JWT secret not configured');
        }
        return jwt.sign(data, JWTMiddleware.JWT_SECRET, { expiresIn: '2h' });
    }

    public static async addToBlacklist(token: string): Promise<void> {
        JWTMiddleware.blacklist.push(token);
    }

    public static async isTokenRevoked(token: string): Promise<boolean> {
        return JWTMiddleware.blacklist.includes(token);
    }
}

export default JWTMiddleware;