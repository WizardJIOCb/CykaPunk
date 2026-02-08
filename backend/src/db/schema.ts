import { pgTable, serial, text, integer, timestamp, boolean, jsonb, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'), // For local authentication
  googleId: text('google_id').unique(), // For OAuth
  discordId: text('discord_id').unique(), // For OAuth
  twitterId: text('twitter_id').unique(), // For OAuth
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Characters table
export const characters = pgTable('characters', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  level: integer('level').default(1).notNull(),
  experience: integer('experience').default(0).notNull(),
  health: integer('health').notNull(),
  maxHealth: integer('max_health').notNull(),
  attack: integer('attack').notNull(),
  defense: integer('defense').notNull(),
  speed: integer('speed').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Items table
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(), // weapon, armor, consumable, currency, material
  slot: text('slot'), // head, torso, rightHand, etc.
  stats: jsonb('stats').notNull(), // { health?: number, attack?: number, ... }
  price: integer('price').notNull(),
  currencyType: text('currency_type').notNull(), // soft, hard, upgrade
  rarity: integer('rarity').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Inventory table
export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemId: integer('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').default(1).notNull(),
  equipped: boolean('equipped').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Currency table
export const currencies = pgTable('currencies', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  softCurrency: integer('soft_currency').default(0).notNull(),
  hardCurrency: integer('hard_currency').default(0).notNull(),
  upgradeCurrency: integer('upgrade_currency').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Battles table
export const battles = pgTable('battles', {
  id: serial('id').primaryKey(),
  player1Id: integer('player1_id').notNull().references(() => users.id),
  player2Id: integer('player2_id').notNull().references(() => users.id),
  winnerId: integer('winner_id').notNull().references(() => users.id),
  battleLog: jsonb('battle_log').notNull(), // Stores the full battle log
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Chat messages table
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  senderName: text('sender_name').notNull(),
  channelId: text('channel_id').notNull(), // general, trade, location, private
  content: text('content').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  messageType: text('message_type').default('text'), // text, emote, system, action
});

// Bosses table
export const bosses = pgTable('bosses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  arena: integer('arena').notNull(),
  number: integer('number').notNull(), // Boss number within the arena
  health: integer('health').notNull(),
  maxHealth: integer('max_health').notNull(),
  attack: integer('attack').notNull(),
  defense: integer('defense').notNull(),
  speed: integer('speed').notNull(),
  rewards: jsonb('rewards').notNull(), // Array of reward objects
  unlocked: boolean('unlocked').default(false).notNull(),
  defeatedBy: integer('defeated_by').references(() => users.id), // UserId of first player to defeat this boss
  defeatedAt: timestamp('defeated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  characters: many(characters),
  inventory: many(inventory),
  currencies: many(currencies),
  sentMessages: many(chatMessages),
  battlesAsPlayer1: many(battles, { relationName: 'player1' }),
  battlesAsPlayer2: many(battles, { relationName: 'player2' }),
  wonBattles: many(battles, { relationName: 'winner' }),
  defeatedBosses: many(bosses, { relationName: 'defeatedByUser' }),
}));

// Character relations
export const charactersRelations = relations(characters, ({ one }) => ({
  user: one(users, { fields: [characters.userId], references: [users.id] }),
}));

// Inventory relations
export const inventoryRelations = relations(inventory, ({ one }) => ({
  user: one(users, { fields: [inventory.userId], references: [users.id] }),
  item: one(items, { fields: [inventory.itemId], references: [items.id] }),
}));

// Currency relations
export const currenciesRelations = relations(currencies, ({ one }) => ({
  user: one(users, { fields: [currencies.userId], references: [users.id] }),
}));

// Battle relations
export const battlesRelations = relations(battles, ({ one }) => ({
  player1: one(users, { fields: [battles.player1Id], references: [users.id], relationName: 'player1' }),
  player2: one(users, { fields: [battles.player2Id], references: [users.id], relationName: 'player2' }),
  winner: one(users, { fields: [battles.winnerId], references: [users.id], relationName: 'winner' }),
}));

// Chat message relations
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  sender: one(users, { fields: [chatMessages.senderId], references: [users.id] }),
}));

// Boss relations
export const bossesRelations = relations(bosses, ({ one }) => ({
  defeatedByUser: one(users, { fields: [bosses.defeatedBy], references: [users.id], relationName: 'defeatedByUser' }),
}));