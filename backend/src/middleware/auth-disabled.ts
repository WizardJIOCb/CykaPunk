import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

import { User } from '../../../shared/types';
import { db } from '../db/connection';
import { users } from '../db/schema';

dotenv.config();

// JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'fallback_secret_key'
};

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const userResult = await db.select().from(users).where(eq(users.id, Number(payload.id)));
    if (userResult.length > 0) {
      return done(null, userResult[0]);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let userResult = await db.select().from(users).where(eq(users.googleId, profile.id));
      
      let user;
      if (userResult.length > 0) {
        // User exists, return existing user
        user = userResult[0];
      } else {
        // Check if email already exists
        userResult = await db.select().from(users).where(eq(users.email, profile.emails?.[0].value || ''));
        if (userResult.length > 0) {
          // Update existing user with Google ID
          user = await db.update(users).set({ googleId: profile.id }).where(eq(users.id, userResult[0].id)).returning();
          user = user[0];
        } else {
          // Create new user
          const newUser = await db.insert(users).values({
            username: profile.displayName,
            email: profile.emails?.[0].value || '',
            googleId: profile.id,
            avatarUrl: profile.photos?.[0]?.value
          }).returning();
          user = newUser[0];
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Discord OAuth Strategy
if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/callback',
    scope: ['identify', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let userResult = await db.select().from(users).where(eq(users.discordId, profile.id));
      
      let user;
      if (userResult.length > 0) {
        // User exists, return existing user
        user = userResult[0];
      } else {
        // Check if email already exists
        userResult = await db.select().from(users).where(eq(users.email, profile.email || ''));
        if (userResult.length > 0) {
          // Update existing user with Discord ID
          user = await db.update(users).set({ discordId: profile.id }).where(eq(users.id, userResult[0].id)).returning();
          user = user[0];
        } else {
          // Create new user
          const newUser = await db.insert(users).values({
            username: profile.username,
            email: profile.email || '',
            discordId: profile.id,
            avatarUrl: profile.avatar
          }).returning();
          user = newUser[0];
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Twitter OAuth Strategy
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      // Check if user already exists
      let userResult = await db.select().from(users).where(eq(users.twitterId, profile.id));
      
      let user;
      if (userResult.length > 0) {
        // User exists, return existing user
        user = userResult[0];
      } else {
        // Create new user
        const newUser = await db.insert(users).values({
          username: profile.username,
          email: '', // Twitter OAuth doesn't provide email by default
          twitterId: profile.id,
          avatarUrl: profile.photos?.[0]?.value
        }).returning();
        user = newUser[0];
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj as User);
});

export const setupAuth = (app: express.Application) => {
  app.use(passport.initialize());
  
  // JWT authentication middleware
  app.use('/api', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
      if (user) {
        (req as any).user = user;
      }
      next();
    })(req, res, next);
  });
};

export const authenticateToken = passport.authenticate('jwt', { session: false });

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '24h' }
  );
};