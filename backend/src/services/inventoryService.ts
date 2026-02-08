import { db } from '../db/connection';
import { inventory, items, users, characters } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { InventoryItem, Item } from '../../../shared/types';

export class InventoryService {
  /**
   * Get user's inventory
   */
  static async getUserInventory(userId: number): Promise<InventoryItem[]> {
    try {
      const result = await db
        .select({
          id: inventory.id,
          itemId: inventory.itemId,
          quantity: inventory.quantity,
          equipped: inventory.equipped,
          createdAt: inventory.createdAt,
          updatedAt: inventory.updatedAt
        })
        .from(inventory)
        .where(eq(inventory.userId, userId));

      return result.map(item => ({
        id: item.id.toString(),
        itemId: item.itemId.toString(),
        quantity: item.quantity,
        equipped: item.equipped
      }));
    } catch (error) {
      console.error('Error getting user inventory:', error);
      throw error;
    }
  }

  /**
   * Add item to user's inventory
   */
  static async addItemToInventory(userId: number, itemId: number, quantity: number = 1): Promise<boolean> {
    try {
      // Check if item already exists in inventory
      const existingItem = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId)
        ));

      if (existingItem.length > 0) {
        // Update quantity if item exists
        await db
          .update(inventory)
          .set({ 
            quantity: sql`${inventory.quantity} + ${quantity}`,
            updatedAt: new Date()
          })
          .where(and(
            eq(inventory.userId, userId),
            eq(inventory.itemId, itemId)
          ));
      } else {
        // Insert new item
        await db
          .insert(inventory)
          .values({
            userId,
            itemId,
            quantity
          });
      }

      return true;
    } catch (error) {
      console.error('Error adding item to inventory:', error);
      throw error;
    }
  }

  /**
   * Remove item from user's inventory
   */
  static async removeItemFromInventory(userId: number, itemId: number, quantity: number = 1): Promise<boolean> {
    try {
      const existingItem = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId)
        ));

      if (existingItem.length === 0) {
        return false; // Item doesn't exist in inventory
      }

      const currentQuantity = existingItem[0].quantity;
      if (currentQuantity < quantity) {
        return false; // Not enough items
      }

      if (currentQuantity === quantity) {
        // Remove the item entirely
        await db
          .delete(inventory)
          .where(and(
            eq(inventory.userId, userId),
            eq(inventory.itemId, itemId)
          ));
      } else {
        // Reduce quantity
        await db
          .update(inventory)
          .set({ 
            quantity: sql`${inventory.quantity} - ${quantity}`,
            updatedAt: new Date()
          })
          .where(and(
            eq(inventory.userId, userId),
            eq(inventory.itemId, itemId)
          ));
      }

      return true;
    } catch (error) {
      console.error('Error removing item from inventory:', error);
      throw error;
    }
  }

  /**
   * Equip an item
   */
  static async equipItem(userId: number, itemId: number): Promise<boolean> {
    try {
      // Check if user owns the item
      const itemOwnership = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId)
        ));

      if (itemOwnership.length === 0) {
        return false; // User doesn't own the item
      }

      // Mark the item as equipped
      await db
        .update(inventory)
        .set({ 
          equipped: true,
          updatedAt: new Date()
        })
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId)
        ));

      return true;
    } catch (error) {
      console.error('Error equipping item:', error);
      throw error;
    }
  }

  /**
   * Unequip an item
   */
  static async unequipItem(userId: number, itemId: number): Promise<boolean> {
    try {
      // Check if item is equipped
      const itemOwnership = await db
        .select()
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId),
          eq(inventory.equipped, true)
        ));

      if (itemOwnership.length === 0) {
        return false; // Item is not equipped or doesn't exist
      }

      // Mark the item as unequipped
      await db
        .update(inventory)
        .set({ 
          equipped: false,
          updatedAt: new Date()
        })
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.itemId, itemId)
        ));

      return true;
    } catch (error) {
      console.error('Error unequipping item:', error);
      throw error;
    }
  }

  /**
   * Get equipped items for a user
   */
  static async getEquippedItems(userId: number): Promise<InventoryItem[]> {
    try {
      const result = await db
        .select({
          id: inventory.id,
          itemId: inventory.itemId,
          quantity: inventory.quantity,
          equipped: inventory.equipped,
          createdAt: inventory.createdAt,
          updatedAt: inventory.updatedAt
        })
        .from(inventory)
        .where(and(
          eq(inventory.userId, userId),
          eq(inventory.equipped, true)
        ));

      return result.map(item => ({
        id: item.id.toString(),
        itemId: item.itemId.toString(),
        quantity: item.quantity,
        equipped: item.equipped
      }));
    } catch (error) {
      console.error('Error getting equipped items:', error);
      throw error;
    }
  }
}