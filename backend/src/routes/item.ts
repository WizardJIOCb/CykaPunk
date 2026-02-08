import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { Item, ItemType, CurrencyType, EquipmentSlot } from '../shared/types';

const router = express.Router();

// Get all items
router.get('/', authenticateToken, (req, res) => {
  // In a real app, this would fetch from the database
  const items: Item[] = [
    {
      id: 'item_1',
      name: 'Basic Sword',
      description: 'A basic sword for beginners',
      type: 'weapon',
      slot: 'weapon',
      stats: { attack: 5 },
      value: 10,
      price: 50,
      currencyType: 'soft',
      effects: {},
      rarity: 1,
      createdAt: new Date()
    },
    {
      id: 'item_2',
      name: 'Leather Armor',
      description: 'Light armor for protection',
      type: 'armor',
      slot: 'chest',
      stats: { defense: 3 },
      value: 15,
      price: 75,
      currencyType: 'soft',
      effects: {},
      rarity: 1,
      createdAt: new Date()
    },
    {
      id: 'item_3',
      name: 'Health Potion',
      description: 'Restores 50 HP',
      type: 'consumable',
      stats: { health: 50 },
      value: 5,
      price: 25,
      currencyType: 'soft',
      effects: {},
      rarity: 1,
      createdAt: new Date()
    },
    {
      id: 'item_4',
      name: 'Advanced Blade',
      description: 'A sharp blade for experienced fighters',
      type: 'weapon',
      slot: 'weapon',
      stats: { attack: 12 },
      value: 20,
      price: 200,
      currencyType: 'hard',
      effects: {},
      rarity: 2,
      createdAt: new Date()
    }
  ];
  
  res.json({ items });
});

// Buy an item
router.post('/buy/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  
  // In a real app, this would validate currency and add item to inventory
  const success = true; // Simulate successful purchase
  
  if (success) {
    res.json({ 
      success: true, 
      message: 'Item purchased successfully',
      newItemId: id
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Insufficient funds or item not available' 
    });
  }
});

// Equip an item
router.post('/equip/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  
  // In a real app, this would update the database
  res.json({ 
    success: true, 
    message: 'Item equipped successfully',
    equippedItemId: id
  });
});

// Unequip an item
router.post('/unequip/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  
  // In a real app, this would update the database
  res.json({ 
    success: true, 
    message: 'Item unequipped successfully',
    unequippedItemId: id
  });
});

export { router as itemRoutes };
