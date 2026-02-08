import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserData {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

interface CharacterData {
  id: number;
  userId: number;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  experience: number;
  experienceToNextLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

const usersStorage: UserData[] = [];
const charactersStorage: CharacterData[] = [];
let nextUserId = 1;
let nextCharacterId = 1;

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Character {
  id: number;
  userId: number;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  experience: number;
  experienceToNextLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService {
  private static SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-here';
  private static SALT_ROUNDS = 12;

  static async register(userData: UserRegistrationData): Promise<{ user: User; character: Character; token: string }> {
    try {
      // Check if user already exists
      const existingUser = usersStorage.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

      // Create user
      const newUser: UserData = {
        id: nextUserId++,
        username: userData.username,
        email: userData.email,
        passwordHash: hashedPassword,
        createdAt: new Date()
      };
      
      usersStorage.push(newUser);

      // Create default character for user
      const character: CharacterData = {
        id: nextCharacterId++,
        userId: newUser.id,
        name: userData.username,
        level: 1,
        health: 100,
        maxHealth: 100,
        attack: 10,
        defense: 5,
        speed: 8,
        experience: 0,
        experienceToNextLevel: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      charactersStorage.push(character);

      // Remove password from response
      const { passwordHash, ...userWithoutPassword } = newUser;

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        this.SECRET_KEY,
        { expiresIn: '24h' }
      );

      return {
        user: userWithoutPassword,
        character,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(loginData: UserLoginData): Promise<{ user: User; character: Character; token: string }> {
    try {
      // Find user by email
      const user = usersStorage.find(u => u.email === loginData.email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(loginData.password, user.passwordHash);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Get user's character
      const character = charactersStorage.find(c => c.userId === user.id);
      if (!character) {
        throw new Error('Character not found');
      }

      // Remove password from response
      const { passwordHash, ...userWithoutPassword } = user;

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        this.SECRET_KEY,
        { expiresIn: '24h' }
      );

      return {
        user: userWithoutPassword,
        character,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  static async verifyToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as { userId: number; email: string };
      
      const user = usersStorage.find(u => u.id === decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.SECRET_KEY,
      { expiresIn: '24h' }
    );
  }
}
