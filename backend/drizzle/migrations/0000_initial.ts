import { sql } from "drizzle-orm";

export async function up(db: any) {
  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `);

  /* =========================
     USERS & AUTH
  ========================= */

  await db.execute(sql`
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      avatar_url TEXT,
      is_guest BOOLEAN DEFAULT FALSE,

      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await db.execute(sql`
    CREATE TABLE oauth_accounts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      provider TEXT NOT NULL,
      provider_user_id TEXT NOT NULL,

      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE (provider, provider_user_id)
    );
  `);

  /* =========================
     CHARACTERS
  ========================= */

  await db.execute(sql`
    CREATE TABLE characters (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,

      name TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      experience BIGINT DEFAULT 0,

      strength INTEGER DEFAULT 5,
      agility INTEGER DEFAULT 5,
      intelligence INTEGER DEFAULT 5,
      vitality INTEGER DEFAULT 5,

      health INTEGER DEFAULT 100,
      energy INTEGER DEFAULT 100,

      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  /* =========================
     CURRENCIES
  ========================= */

  await db.execute(sql`
    CREATE TABLE currencies (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE character_currencies (
      character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
      currency_id INTEGER REFERENCES currencies(id),
      amount BIGINT DEFAULT 0,

      PRIMARY KEY (character_id, currency_id)
    );
  `);

  /* =========================
     ITEMS & EQUIPMENT
  ========================= */

  await db.execute(sql`
    CREATE TABLE items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      slot TEXT NOT NULL,

      strength_bonus INTEGER DEFAULT 0,
      agility_bonus INTEGER DEFAULT 0,
      intelligence_bonus INTEGER DEFAULT 0,
      vitality_bonus INTEGER DEFAULT 0,

      price BIGINT DEFAULT 0,
      currency_code TEXT,

      spine_attachment TEXT,

      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await db.execute(sql`
    CREATE TABLE character_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
      item_id UUID REFERENCES items(id),
      equipped BOOLEAN DEFAULT FALSE,

      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  /* =========================
     CHAT SYSTEM
  ========================= */

  await db.execute(sql`
    CREATE TABLE chat_channels (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      type TEXT NOT NULL, -- global | trade | location | private
      name TEXT NOT NULL,
      location_code TEXT,

      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await db.execute(sql`
    CREATE TABLE chat_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      channel_id UUID REFERENCES chat_channels(id) ON DELETE CASCADE,
      sender_id UUID REFERENCES users(id) ON DELETE CASCADE,

      content TEXT,
      media_url TEXT,

      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  /* =========================
     PRIVATE CHAT MEMBERS
  ========================= */

  await db.execute(sql`
    CREATE TABLE private_channel_members (
      channel_id UUID REFERENCES chat_channels(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,

      PRIMARY KEY (channel_id, user_id)
    );
  `);

  await db.execute(sql`
    CREATE UNIQUE INDEX unique_private_pair
    ON private_channel_members(channel_id)
    WHERE channel_id IN (
      SELECT id FROM chat_channels WHERE type = 'private'
    );
  `);

  /* =========================
     ONLINE SESSIONS
  ========================= */

  await db.execute(sql`
    CREATE TABLE user_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      socket_id TEXT,
      last_seen TIMESTAMPTZ DEFAULT now()
    );
  `);

  /* =========================
     INDEXES
  ========================= */

  await db.execute(sql`
    CREATE INDEX idx_chat_messages_channel
      ON chat_messages(channel_id, created_at);

    CREATE INDEX idx_character_user
      ON characters(user_id);

    CREATE INDEX idx_sessions_user
      ON user_sessions(user_id);
  `);
}

export async function down(db: any) {
  await db.execute(sql`DROP TABLE IF EXISTS user_sessions;`);
  await db.execute(sql`DROP TABLE IF EXISTS private_channel_members;`);
  await db.execute(sql`DROP TABLE IF EXISTS chat_messages;`);
  await db.execute(sql`DROP TABLE IF EXISTS chat_channels;`);
  await db.execute(sql`DROP TABLE IF EXISTS character_items;`);
  await db.execute(sql`DROP TABLE IF EXISTS items;`);
  await db.execute(sql`DROP TABLE IF EXISTS character_currencies;`);
  await db.execute(sql`DROP TABLE IF EXISTS currencies;`);
  await db.execute(sql`DROP TABLE IF EXISTS characters;`);
  await db.execute(sql`DROP TABLE IF EXISTS oauth_accounts;`);
  await db.execute(sql`DROP TABLE IF EXISTS users;`);
}
