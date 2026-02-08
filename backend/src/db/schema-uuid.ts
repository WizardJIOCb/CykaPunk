import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, varchar, bigint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash'),
  avatarUrl: text('avatar_url'),
  isGuest: boolean('is_guest').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// OAuth accounts table
export const oauthAccounts = pgTable('oauth_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(),
  providerUserId: text('provider_user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Characters table
export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').unique().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  level: integer('level').default(1),
  experience: bigint('experience', { mode: 'number' }).default(0),
  strength: integer('strength').default(5),
  agility: integer('agility').default(5),
  intelligence: integer('intelligence').default(5),
  vitality: integer('vitality').default(5),
  health: integer('health').default(100),
  energy: integer('energy').default(100),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Currencies table
export const currencies = pgTable('currencies', {
  id: integer('id').primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
});

// Character currencies table
export const characterCurrencies = pgTable('character_currencies', {
  characterId: uuid('character_id').references(() => characters.id, { onDelete: 'cascade' }),
  currencyId: integer('currency_id').references(() => currencies.id),
  amount: bigint('amount', { mode: 'number' }).default(0),
});

// Items table
export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  slot: text('slot').notNull(),
  strengthBonus: integer('strength_bonus').default(0),
  agilityBonus: integer('agility_bonus').default(0),
  intelligenceBonus: integer('intelligence_bonus').default(0),
  vitalityBonus: integer('vitality_bonus').default(0),
  price: bigint('price', { mode: 'number' }).default(0),
  currencyCode: text('currency_code'),
  spineAttachment: text('spine_attachment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Character items table
export const characterItems = pgTable('character_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  characterId: uuid('character_id').references(() => characters.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').references(() => items.id),
  equipped: boolean('equipped').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Chat channels table
export const chatChannels = pgTable('chat_channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(), // global | trade | location | private
  name: text('name').notNull(),
  locationCode: text('location_code'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Chat messages table
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').references(() => chatChannels.id, { onDelete: 'cascade' }),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }),
  content: text('content'),
  mediaUrl: text('media_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Private channel members table
export const privateChannelMembers = pgTable('private_channel_members', {
  channelId: uuid('channel_id').references(() => chatChannels.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
});

// User sessions table
export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  socketId: text('socket_id'),
  lastSeen: timestamp('last_seen').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  character: one(characters),
  oauthAccounts: many(oauthAccounts),
  chatMessages: many(chatMessages),
  userSessions: many(userSessions),
  privateChannels: many(privateChannelMembers),
}));

export const charactersRelations = relations(characters, ({ one, many }) => ({
  user: one(users),
  currencies: many(characterCurrencies),
  items: many(characterItems),
}));

export const currenciesRelations = relations(currencies, ({ many }) => ({
  characterCurrencies: many(characterCurrencies),
}));

export const characterCurrenciesRelations = relations(characterCurrencies, ({ one }) => ({
  character: one(characters),
  currency: one(currencies),
}));

export const itemsRelations = relations(items, ({ many }) => ({
  characterItems: many(characterItems),
}));

export const characterItemsRelations = relations(characterItems, ({ one }) => ({
  character: one(characters),
  item: one(items),
}));

export const chatChannelsRelations = relations(chatChannels, ({ many }) => ({
  messages: many(chatMessages),
  privateMembers: many(privateChannelMembers),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  channel: one(chatChannels),
  sender: one(users),
}));

export const privateChannelMembersRelations = relations(privateChannelMembers, ({ one }) => ({
  channel: one(chatChannels),
  user: one(users),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users),
}));