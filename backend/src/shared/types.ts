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
  id: string;
  name: string;
  description: string;
  type: ItemType;
  slot?: EquipmentSlot;
  rarity: number;
  value: number;
  effects: Record<string, any>;
  stats?: Record<string, number>;
  createdAt: Date;
};

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  CONSUMABLE = 'consumable',
  MATERIAL = 'material'
}

export type InventoryItem = {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  equipped: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Currency = {
  id?: string;
  userId: string;
  softCurrency: number;
  hardCurrency: number;
  upgradeCurrency: number;
  createdAt: Date;
  updatedAt: Date;
};

export enum CurrencyType {
  SOFT = 'soft',
  HARD = 'hard',
  UPGRADE = 'upgrade'
}

export enum EquipmentSlot {
  RIGHT_HAND = 'weapon',
  HELMET = 'helmet',
  TORSO = 'chest',
  LEGS = 'legs',
  BOOTS = 'boots',
  ACCESSORY = 'accessory'
}

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName?: string;
  channelId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  type: MessageType;
};

export type ChatChannel = 'global' | 'guild' | 'private';

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  BATTLE = 'battle'
}

export type OnlinePlayer = {
  id: string;
  userId: string;
  username: string;
  characterName?: string;
  level?: number;
  lastSeen: Date;
  isConnected?: boolean;
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

export enum BattleMode {
  PVP = 'pvp',
  PVE = 'pve',
  BOSS = 'boss'
}

export enum BattleResult {
  WIN = 'win',
  LOSS = 'loss',
  DRAW = 'draw'
}

export type PlayerBattleRequest = {
  playerId: string;
  targetPlayerId: string;
  mode: BattleMode;
  timestamp: Date;
};
