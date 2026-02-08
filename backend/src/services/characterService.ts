import { db } from '../db/connection';
import { characters, users, inventory } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { Character } from '../../../shared/types';

export class CharacterService {
  /**
   * Get character by user ID
   */
  static async getCharacterByUserId(userId: string): Promise<Character | null> {
    try {
      const result = await db
        .select()
        .from(characters)
        .where(eq(characters.userId, userId));

      if (result.length === 0) {
        return null;
      }

      const char = result[0];
      return {
        id: char.id.toString(),
        userId: char.userId.toString(),
        name: char.name,
        level: char.level,
        experience: char.experience,
        health: char.health,
        maxHealth: char.maxHealth,
        attack: char.attack,
        defense: char.defense,
        speed: char.speed,
        createdAt: char.createdAt,
        updatedAt: char.updatedAt
      };
    } catch (error) {
      console.error('Error getting character:', error);
      throw error;
    }
  }

  /**
   * Create a new character for a user
   */
  static async createCharacter(userId: string, name: string): Promise<Character> {
    try {
      // Check if user already has a character
      const existingChar = await this.getCharacterByUserId(userId.toString());
      if (existingChar) {
        throw new Error('User already has a character');
      }

      // Create new character with default stats
      const [newChar] = await db
        .insert(characters)
        .values({
          userId: userId.toString(),
          name,
          level: 1,
          experience: 0,
          health: 100,
          maxHealth: 100,
          attack: 10,
          defense: 5,
          speed: 8
        })
        .returning();

      return {
        id: newChar.id.toString(),
        userId: newChar.userId.toString(),
        name: newChar.name,
        level: newChar.level,
        experience: newChar.experience,
        health: newChar.health,
        maxHealth: newChar.maxHealth,
        attack: newChar.attack,
        defense: newChar.defense,
        speed: newChar.speed,
        createdAt: newChar.createdAt,
        updatedAt: newChar.updatedAt
      };
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  }

  /**
   * Update character stats
   */
  static async updateCharacter(id: number, updates: Partial<Omit<Character, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Character> {
    try {
      const [updatedChar] = await db
        .update(characters)
        .set({
          ...(updates as any), // Type assertion since the fields match except for ID
          updatedAt: new Date()
        })
        .where(eq(characters.id, id))
        .returning();

      return {
        id: updatedChar.id.toString(),
        userId: updatedChar.userId.toString(),
        name: updatedChar.name,
        level: updatedChar.level,
        experience: updatedChar.experience,
        health: updatedChar.health,
        maxHealth: updatedChar.maxHealth,
        attack: updatedChar.attack,
        defense: updatedChar.defense,
        speed: updatedChar.speed,
        createdAt: updatedChar.createdAt,
        updatedAt: updatedChar.updatedAt
      };
    } catch (error) {
      console.error('Error updating character:', error);
      throw error;
    }
  }

  /**
   * Level up a character
   */
  static async levelUpCharacter(characterId: number): Promise<Character> {
    try {
      const char = await this.getCharacterById(characterId);
      if (!char) {
        throw new Error('Character not found');
      }

      // Calculate new stats based on level
      const newLevel = char.level + 1;
      const newMaxHealth = char.maxHealth + 10;
      const newHealth = newMaxHealth; // Restore full health on level up
      const newAttack = char.attack + 2;
      const newDefense = char.defense + 1;
      const newSpeed = char.speed + 1;

      return await this.updateCharacter(characterId, {
        level: newLevel,
        experience: 0, // Reset experience for next level
        health: newHealth,
        maxHealth: newMaxHealth,
        attack: newAttack,
        defense: newDefense,
        speed: newSpeed
      });
    } catch (error) {
      console.error('Error leveling up character:', error);
      throw error;
    }
  }

  /**
   * Get character by ID
   */
  static async getCharacterById(id: number): Promise<Character | null> {
    try {
      const result = await db
        .select()
        .from(characters)
        .where(eq(characters.id, id));

      if (result.length === 0) {
        return null;
      }

      const char = result[0];
      return {
        id: char.id.toString(),
        userId: char.userId.toString(),
        name: char.name,
        level: char.level,
        experience: char.experience,
        health: char.health,
        maxHealth: char.maxHealth,
        attack: char.attack,
        defense: char.defense,
        speed: char.speed,
        createdAt: char.createdAt,
        updatedAt: char.updatedAt
      };
    } catch (error) {
      console.error('Error getting character by ID:', error);
      throw error;
    }
  }

  /**
   * Equip an item to a character
   */
  static async equipItem(userId: number, itemId: number): Promise<boolean> {
    try {
      // Verify the user owns the item
      const itemOwnership = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId.toString()),
          eq(inventory.itemId, itemId)
        ));

      if (itemOwnership.length === 0) {
        return false; // User doesn't own the item
      }

      // Mark the item as equipped
      await db
        .update(inventory)
        .set({ equipped: true })
        .where(eq(inventory.id, itemOwnership[0].id));

      return true;
    } catch (error) {
      console.error('Error equipping item:', error);
      throw error;
    }
  }

  /**
   * Unequip an item from a character
   */
  static async unequipItem(userId: number, itemId: number): Promise<boolean> {
    try {
      // Find the equipped item
      const itemOwnership = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId.toString())
          eq(inventory.itemId, itemId),
          eq(inventory.equipped, true)
        ));

      if (itemOwnership.length === 0) {
        return false; // Item is not equipped or doesn't exist
      }

      // Mark the item as unequipped
      await db
        .update(inventory)
        .set({ equipped: false })
        .where(eq(inventory.id, itemOwnership[0].id));

      return true;
    } catch (error) {
      console.error('Error unequipping item:', error);
      throw error;
    }
  }
}