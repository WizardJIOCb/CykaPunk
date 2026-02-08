import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';
import { users, characters, currencies } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export class UserService {
  static async register(userData: UserRegistrationData) {
    try {
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, userData.email));
      if (existingUser.length > 0) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create user
      const [newUser] = await db.insert(users).values({
        username: userData.username,
        email: userData.email,
        passwordHash: hashedPassword,
      }).returning();

      // Create default character for user
      const [character] = await db.insert(characters).values({
        userId: newUser.id,
        name: userData.username,
        level: 1,
        health: 100,
        maxHealth: 100,
        attack: 10,
        defense: 5,
        speed: 8,
        experience: 0,
      }).returning();

      // Create default currency
      await db.insert(currencies).values({
        userId: newUser.id,
        softCurrency: 500, // Starting currency
        hardCurrency: 0,
        upgradeCurrency: 0,
      });

      // Remove password from response
      const { passwordHash, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
        character
      };
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async login(loginData: UserLoginData) {
    try {
      // Find user by email
      const [user] = await db.select().from(users).where(eq(users.email, loginData.email));
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(loginData.password, user.passwordHash || '');
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Remove password from response
      const { passwordHash, ...userWithoutPassword } = user;

      // Get user's character
      const [character] = await db.select().from(characters).where(eq(characters.userId, user.id));

      return {
        user: userWithoutPassword,
        character
      };
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  static async findById(id: number) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      if (!user) return null;
      
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }

  static async findByEmail(email: string) {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user || null;
    } catch (error) {
      return null;
    }
  }
}