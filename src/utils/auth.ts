import { config } from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

interface JwtPayload {
    userId: string;
    email: string;
};

export const generateToken = (userId: string, email: string): string => {
    return jwt.sign({ userId, email }, config.jwt.secret as jwt.Secret, {
        expiresIn: config.jwt.expiresIn as string | number,
    });
};
