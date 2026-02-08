import { db } from '../db/connection';
import { currencies, users, characters } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { Currency, CurrencyType } from '../shared/types';

export class CurrencyService {
  /**
   * Get user's currencies
   */
  static async getCurrencies(userId: string): Promise<Currency> {
    try {
      const result = await db
        .select()
        .from(currencies)
        .where(eq(currencies.userId, userId.toString()));

      if (result.length === 0) {
        // Create default currencies if user doesn't have any
        const [newCurrency] = await db
          .insert(currencies)
          .values({
            userId: userId.toString(),
            softCurrency: 100, // Starting amount
            hardCurrency: 0,
            upgradeCurrency: 0
          })
          .returning();

        return {
          id: newCurrency.id.toString(),
          userId: newCurrency.userId.toString(),
          softCurrency: newCurrency.softCurrency,
          hardCurrency: newCurrency.hardCurrency,
          upgradeCurrency: newCurrency.upgradeCurrency
        };
      }

      const currency = result[0];
      return {
        id: currency.id.toString(),
        userId: currency.userId.toString(),
        softCurrency: currency.softCurrency,
        hardCurrency: currency.hardCurrency,
        upgradeCurrency: currency.upgradeCurrency
      };
    } catch (error) {
      console.error('Error getting currencies:', error);
      throw error;
    }
  }

  /**
   * Update user's currencies
   */
  static async updateCurrencies(userId: number, updates: Partial<{ softCurrency: number; hardCurrency: number; upgradeCurrency: number }>): Promise<Currency> {
    try {
      const [updatedCurrency] = await db
        .update(currencies)
        .set({
          softCurrency: updates.softCurrency !== undefined ? updates.softCurrency : sql<number>`currencies.soft_currency`,
          hardCurrency: updates.hardCurrency !== undefined ? updates.hardCurrency : sql<number>`currencies.hard_currency`,
          upgradeCurrency: updates.upgradeCurrency !== undefined ? updates.upgradeCurrency : sql<number>`currencies.upgrade_currency`,
          updatedAt: new Date()
        })
        .where(eq(currencies.userId, userId.toString()))
        .returning();

      return {
        id: updatedCurrency.id.toString(),
        userId: updatedCurrency.userId.toString(),
        softCurrency: updatedCurrency.softCurrency,
        hardCurrency: updatedCurrency.hardCurrency,
        upgradeCurrency: updatedCurrency.upgradeCurrency
      };
    } catch (error) {
      console.error('Error updating currencies:', error);
      throw error;
    }
  }

  /**
   * Add to a specific currency type
   */
  static async addCurrency(userId: number, currencyType: CurrencyType, amount: number): Promise<Currency> {
    try {
      // Fetch current currencies
      const currentCurrencies = await this.getCurrencies(userId.toString());
      
      // Calculate new amounts
      let newSoft = currentCurrencies.softCurrency;
      let newHard = currentCurrencies.hardCurrency;
      let newUpgrade = currentCurrencies.upgradeCurrency;
      
      switch (currencyType) {
        case CurrencyType.SOFT:
          newSoft += amount;
          break;
        case CurrencyType.HARD:
          newHard += amount;
          break;
        case CurrencyType.UPGRADE:
          newUpgrade += amount;
          break;
      }

      // Update currencies
      return await this.updateCurrencies(userId, {
        softCurrency: newSoft,
        hardCurrency: newHard,
        upgradeCurrency: newUpgrade
      });
    } catch (error) {
      console.error('Error adding currency:', error);
      throw error;
    }
  }

  /**
   * Spend a specific currency type
   */
  static async spendCurrency(userId: string, currencyType: CurrencyType, amount: number): Promise<boolean> {
    try {
      const currentCurrencies = await this.getCurrencies(userId.toString());

      let canSpend = false;
      switch (currencyType) {
        case CurrencyType.SOFT:
          canSpend = currentCurrencies.softCurrency >= amount;
          break;
        case CurrencyType.HARD:
          canSpend = currentCurrencies.hardCurrency >= amount;
          break;
        case CurrencyType.UPGRADE:
          canSpend = currentCurrencies.upgradeCurrency >= amount;
          break;
      }

      if (!canSpend) {
        return false; // Insufficient funds
      }

      // Calculate new amounts
      let newSoft = currentCurrencies.softCurrency;
      let newHard = currentCurrencies.hardCurrency;
      let newUpgrade = currentCurrencies.upgradeCurrency;
      
      switch (currencyType) {
        case CurrencyType.SOFT:
          newSoft -= amount;
          break;
        case CurrencyType.HARD:
          newHard -= amount;
          break;
        case CurrencyType.UPGRADE:
          newUpgrade -= amount;
          break;
      }

      await this.updateCurrencies(userId, {
        softCurrency: newSoft,
        hardCurrency: newHard,
        upgradeCurrency: newUpgrade
      });
      return true;
    } catch (error) {
      console.error('Error spending currency:', error);
      throw error;
    }
  }

  /**
   * Transfer currency between users
   */
  static async transferCurrency(fromUserId: number, toUserId: number, currencyType: CurrencyType, amount: number): Promise<boolean> {
    try {
      // Check if sender has enough currency
      const senderCurrencies = await this.getCurrencies(fromUserId);

      let hasEnough = false;
      switch (currencyType) {
        case CurrencyType.SOFT:
          hasEnough = senderCurrencies.softCurrency >= amount;
          break;
        case CurrencyType.HARD:
          hasEnough = senderCurrencies.hardCurrency >= amount;
          break;
        case CurrencyType.UPGRADE:
          hasEnough = senderCurrencies.upgradeCurrency >= amount;
          break;
      }

      if (!hasEnough) {
        return false; // Insufficient funds
      }

      // Perform the transaction in a transaction to ensure atomicity
      await db.transaction(async (tx) => {
        // Deduct from sender
        let senderSoft = senderCurrencies.softCurrency;
        let senderHard = senderCurrencies.hardCurrency;
        let senderUpgrade = senderCurrencies.upgradeCurrency;
        
        switch (currencyType) {
          case CurrencyType.SOFT:
            senderSoft -= amount;
            break;
          case CurrencyType.HARD:
            senderHard -= amount;
            break;
          case CurrencyType.UPGRADE:
            senderUpgrade -= amount;
            break;
        }
        
        await tx.update(currencies).set({
          softCurrency: senderSoft,
          hardCurrency: senderHard,
          upgradeCurrency: senderUpgrade,
          updatedAt: new Date()
        }).where(eq(currencies.userId, fromUserId.toString()));

        // Add to receiver
        const receiverCurrencies = await this.getCurrencies(toUserId);
        let receiverSoft = receiverCurrencies.softCurrency;
        let receiverHard = receiverCurrencies.hardCurrency;
        let receiverUpgrade = receiverCurrencies.upgradeCurrency;
        
        switch (currencyType) {
          case CurrencyType.SOFT:
            receiverSoft += amount;
            break;
          case CurrencyType.HARD:
            receiverHard += amount;
            break;
          case CurrencyType.UPGRADE:
            receiverUpgrade += amount;
            break;
        }
        
        await tx.update(currencies).set({
          softCurrency: receiverSoft,
          hardCurrency: receiverHard,
          upgradeCurrency: receiverUpgrade,
          updatedAt: new Date()
        }).where(eq(currencies.userId, toUserId));
      });

      return true;
    } catch (error) {
      console.error('Error transferring currency:', error);
      throw error;
    }
  }
}
