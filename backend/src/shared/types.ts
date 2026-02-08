// Minimal shared types for backend build compatibility
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

export type BattleMode = string;
export type CurrencyType = string;
export type ChatChannel = string;
export type MessageType = string;
export type ItemType = string;
export type EquipmentSlot = string;

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
  type: string;
  slot?: string;
  rarity: number;
  value: number;
  price?: number;
  currencyType?: string;
  effects: Record<string, any>;
  stats?: Record<string, number>;
  createdAt: Date;
};

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

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName?: string;
  channelId: ChatChannel;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  messageType: MessageType;
};

export type OnlinePlayer = {
  id: string;
  userId: string;
  username: string;
  characterName?: string;
  level?: number;
  lastSeen: Date;
  isConnected?: boolean;
  location?: string;
};

export type Battle = {
  id: string;
  attackerId: string;
  defenderId: string;
  mode: BattleMode;
  result?: any;
  rewards?: any;
  startedAt: Date;
  endedAt?: Date;
};

export type BattleResult = {
  battleId: string;
  winnerId?: string;
  loserId?: string;
  rewards: Array<{
    currencyType?: CurrencyType;
    itemId?: string;
    amount: number;
  }>;
  experienceGained: number;
  completedAt?: Date;
}

export type PlayerBattleRequest = {
  playerId: string;
  targetPlayerId: string;
  mode: string;
  timestamp: Date;
};
