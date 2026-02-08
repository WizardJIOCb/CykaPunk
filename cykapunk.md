CykaPunk — Online Browser Game Specification

This document is a single, complete instruction for Qoder to implement an online browser game called CykaPunk in a Cyberpunk style.

The goal is to build a fully playable MVP architecture with extensibility in mind.

1. Game Overview

CykaPunk is a multiplayer online browser game focused on:

Character progression

Equipment & currencies

Automatic round-based combat

PvE bosses & PvP matchmaking

Real-time chat

Spine 2D skeletal animations for all characters and combat

Combat is server-calculated, while the client replays combat logs visually using Spine animations.

2. UI & Layout (MANDATORY)
Base UI Template

The entire interface layout must be based one-to-one on this template:

https://codepen.io/hussard/pen/ExgbXMP

This includes:

Frame structure

Menu placement

Chat placement

Overall cyberpunk aesthetic

Top Menu

Menu items (fixed at the top):

Персонаж

Локация

Магазин

Бои

Выход

Central Content Area

Large central area below the menu used to render:

Character screen

Location screen

Shop

Battles

Routing must swap content inside the same frame, not reload pages.

Chat (Bottom Area)

Chat must include:

Message input

Scrollable message list

Online players list on the right

Chat channels (tabs):

Общий

Торговля

Текущая локация

Приват

Chat features:

Real-time via Socket.IO

Emoji support (high-quality emoji set)

Image & media upload support

Private messaging to any player

3. Character System
Spine Animation (MANDATORY)

All characters must be rendered using:

Spine — 2D Skeletal Animation for Games

Temporary skeleton assets must use the demo character described here: http://ru.esotericsoftware.com/spine-skeleton-viewer

The futuristic masked character with animations:

Idle

Walk / Run

Shoot / Attack

Jump

Death

Equipment Slots

Characters can equip items in these categories:

Head

Torso

Right Hand

Left Hand

Belt

Pants

Boots

Cosmetic overlays (Spine attachments)

Equipped items must visually affect the Spine skeleton.

4. Shop System

In the shop:

Players can buy items

Equip items instantly

See a live Spine preview of the character

Preview must:

Update immediately on equip

Use the same Spine skeleton as gameplay

Currencies must be validated server-side.

5. Combat System (CORE FEATURE)
General Rules

Combat is automatic

Turn-based, round-based

Initiative-based attack order

Fully calculated on the server

Combat Flow

Server calculates full combat

Server returns structured combat log

Client replays the fight visually using Spine animations

Visual Combat

Characters positioned like a classic fighting game (left / right)

Actions are played strictly from combat logs

No client-side RNG or damage calculation

Animations used:

Attack

Hit reaction

Death

6. PvP & PvE Modes
PvP

Matchmaking against a random player of similar power

Flow: Search → Match → Combat Replay

Boss Mode (Leagues)

Sequential boss fights

Example structure:

Arena 1: Bosses 1–10

Arena 2: Bosses 11–20

Rules:

Must defeat boss N to unlock boss N+1

After completing 10 bosses → unlock new arena

Bosses:

Unique stats

Increasing difficulty

7. Currency System

Characters must support multiple currencies, for example:

Soft currency (grind)

Hard currency (rare)

Upgrade currency

Currencies are used for:

Character upgrades

Item purchases

Progression unlocks

All currency logic is server-authoritative.

8. Multiplayer & Social Features

Players must be able to:

Chat globally

Chat per location

Trade via chat

Send private messages

See online players in real time

Socket.IO is required for:

Chat

Online presence

Combat events

9. Backend Requirements (MANDATORY STACK)

Backend must be implemented using:

Node.js

Express

TypeScript

PostgreSQL

Drizzle ORM

JWT authentication

Passport.js OAuth:

Google

Discord

Twitter

Socket.IO (real-time)

Helmet (security)

Winston (logging)

Server Responsibilities:

Authentication

Combat calculations

Inventory & equipment

Currency validation

Chat messaging

Matchmaking

10. Frontend Requirements (MANDATORY STACK)

Frontend must use:

React 19.x + TypeScript

Tailwind CSS

wouter (routing)

TanStack Query

Socket.IO client

React Hook Form + Zod

i18next + react-i18next (EN / RU)

Radix UI + shadcn/ui style components

Frontend Responsibilities:

UI rendering

Spine animation playback

Combat log visualization

Chat UI

Shop & inventory UI

11. Technical Notes

All combat logic must be deterministic and server-side

Client is only a visualizer

Spine assets must be modular for future replacement

Architecture must support future expansion

12. MVP Goal

Deliver a playable MVP with:

Authentication

One character

Shop with few items

One PvP mode

One boss arena

Functional chat

Spine-based combat replay

This document is authoritative. Qoder should follow it exactly and ask questions only if implementation is blocked.