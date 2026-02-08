// Copy of shared types for backend build compatibility
export type User = {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  avatarUrl?: string;
  isGuest: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Character = {
  id: string;
  userId: string;
  name: string;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  type: ItemType;
  rarity: number;
  value: number;
  effects: Record<string, any>;
  createdAt: Date;
};

export type ItemType = 'weapon' | 'armor' | 'consumable' | 'material';

export type InventoryItem = {
  id: number;
  userId: string;
  itemId: number;
  quantity: number;
  equipped: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Currency = {
  id?: number;
  userId: string;
  softCurrency: number;
  hardCurrency: number;
  upgradeCurrency: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrencyType = 'soft' | 'hard' | 'upgrade';

export type EquipmentSlot = 'weapon' | 'helmet' | 'chest' | 'legs' | 'boots' | 'accessory';

export type ChatMessage = {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  type: MessageType;
};

export type ChatChannel = {
  id: string;
  name: string;
  type: 'global' | 'guild' | 'private';
  createdAt: Date;
};

export type MessageType = 'text' | 'system' | 'battle';

export type OnlinePlayer = {
  userId: string;
  username: string;
  characterName?: string;
  level?: number;
  lastSeen: Date;
};

export type Battle = {
  id: string;
  attackerId: string;
  defenderId: string;
  mode: BattleMode;
  result?: BattleResult;
  rewards?: any;
  startedAt: Date;
  endedAt?: Date;
};

export type BattleMode = 'pvp' | 'pve' | 'boss';

export type BattleResult = 'win' | 'loss' | 'draw';

export type PlayerBattleRequest = {
  playerId: string;
  targetPlayerId: string;
  mode: BattleMode;
  timestamp: Date;
};
