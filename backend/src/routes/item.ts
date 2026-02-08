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
      type: ItemType.WEAPON,
      slot: EquipmentSlot.RIGHT_HAND,
      stats: { attack: 5 },
      price: 50,
      currencyType: CurrencyType.SOFT,
      rarity: 1
    },
    {
      id: 'item_2',
      name: 'Leather Armor',
      description: 'Light armor for protection',
      type: ItemType.ARMOR,
      slot: EquipmentSlot.TORSO,
      stats: { defense: 3 },
      price: 75,
      currencyType: CurrencyType.SOFT,
      rarity: 1
    },
    {
      id: 'item_3',
      name: 'Health Potion',
      description: 'Restores 50 HP',
      type: ItemType.CONSUMABLE,
      stats: { health: 50 },
      price: 25,
      currencyType: CurrencyType.SOFT,
      rarity: 1
    },
    {
      id: 'item_4',
      name: 'Advanced Blade',
      description: 'A sharp blade for experienced fighters',
      type: ItemType.WEAPON,
      slot: EquipmentSlot.RIGHT_HAND,
      stats: { attack: 12 },
      price: 200,
      currencyType: CurrencyType.HARD,
      rarity: 2
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
