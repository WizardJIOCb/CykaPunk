// Shared types between frontend and backend

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Character {
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
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  slot?: EquipmentSlot;
  stats: ItemStats;
  price: number;
  currencyType: CurrencyType;
  rarity: number;
}

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  CONSUMABLE = 'consumable',
  CURRENCY = 'currency',
  MATERIAL = 'material'
}

export enum EquipmentSlot {
  HEAD = 'head',
  TORSO = 'torso',
  RIGHT_HAND = 'rightHand',
  LEFT_HAND = 'leftHand',
  BELT = 'belt',
  PANTS = 'pants',
  BOOTS = 'boots',
  COSMETIC = 'cosmetic'
}

export interface ItemStats {
  health?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  critChance?: number;
  critDamage?: number;
}

export interface InventoryItem {
  id: string;
  itemId: string;
  quantity: number;
  equipped: boolean;
}

export interface PlayerInventory {
  id: string;
  userId: string;
  items: InventoryItem[];
}

export interface Battle {
  id: string;
  player1Id: string;
  player2Id: string;
  winnerId: string;
  battleLog: BattleLogEntry[];
  createdAt: Date;
}

export interface BattleLogEntry {
  turn: number;
  actorId: string;
  action: BattleAction;
  targetId: string;
  damage?: number;
  effect?: string;
  message: string;
}

export enum BattleAction {
  ATTACK = 'attack',
  SPECIAL_ATTACK = 'special_attack',
  DEFEND = 'defend',
  USE_ITEM = 'use_item',
  MISS = 'miss',
  CRITICAL_HIT = 'critical_hit',
  DEATH = 'death'
}

export interface Currency {
  id: string;
  userId: string;
  softCurrency: number;
  hardCurrency: number;
  upgradeCurrency: number;
}

export enum CurrencyType {
  SOFT = 'soft',
  HARD = 'hard',
  UPGRADE = 'upgrade'
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  channelId: ChatChannel;
  content: string;
  timestamp: Date;
  messageType: MessageType;
}

export enum ChatChannel {
  GENERAL = 'general',
  TRADE = 'trade',
  LOCATION = 'location',
  PRIVATE = 'private'
}

export enum MessageType {
  TEXT = 'text',
  EMOTE = 'emote',
  SYSTEM = 'system',
  ACTION = 'action'
}

export interface OnlinePlayer {
  id: string;
  username: string;
  isConnected: boolean;
  lastSeen: Date;
  location: string;
}

export interface Boss {
  id: string;
  name: string;
  arena: number;
  number: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  rewards: Reward[];
  unlocked: boolean;
}

export interface Reward {
  itemId?: string;
  currencyType?: CurrencyType;
  amount: number;
}

export interface PlayerBattleRequest {
  playerId: string;
  mode: BattleMode;
}

export enum BattleMode {
  PVP = 'pvp',
  BOSS = 'boss'
}

export interface BattleResult {
  battleId: string;
  winnerId: string;
  rewards: Reward[];
  experienceGained: number;
}