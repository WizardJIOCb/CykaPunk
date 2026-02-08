import { Server, Socket } from 'socket.io';
import { authenticateToken } from '../middleware/auth';
import { ChatMessage, ChatChannel, OnlinePlayer, PlayerBattleRequest, BattleMode, MessageType } from '../shared/types';

// In-memory storage for online players (in production, use Redis)
let onlinePlayers: OnlinePlayer[] = [];

export const setupSocketIO = (io: Server) => {
  io.use((socket, next) => {
    // Here we'd typically verify the JWT token from the handshake.auth
    // For simplicity, we're allowing all connections
    // In production, verify the token properly
    next();
  });

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining the game
    socket.on('join-game', (userData) => {
      const newPlayer: OnlinePlayer = {
        id: userData.id || socket.id,
        username: userData.username || `Player_${socket.id.substring(0, 4)}`,
        isConnected: true,
        lastSeen: new Date(),
        location: userData.location || 'Lobby'
      };

      // Remove player if already exists
      onlinePlayers = onlinePlayers.filter(player => player.id !== newPlayer.id);
      onlinePlayers.push(newPlayer);

      // Broadcast updated online players list
      io.emit('online-players-update', onlinePlayers);
    });

    // Handle sending chat messages
    socket.on('send-message', (data: { channelId: ChatChannel, content: string, senderId: string, senderName: string }) => {
      const message: ChatMessage = {
        id: `msg_${Date.now()}_${socket.id}`,
        senderId: data.senderId,
        senderName: data.senderName,
        channelId: data.channelId,
        content: data.content,
        timestamp: new Date(),
        messageType: MessageType.TEXT
      };

      // Broadcast message to appropriate channel
      io.emit('new-message', message);
    });

    // Handle joining a specific chat channel
    socket.on('join-channel', (channelId: ChatChannel) => {
      socket.join(channelId);
    });

    // Handle leaving a chat channel
    socket.on('leave-channel', (channelId: ChatChannel) => {
      socket.leave(channelId);
    });

    // Handle private messaging
    socket.on('send-private-message', (data: { recipientId: string, content: string, senderId: string, senderName: string }) => {
      // Find recipient socket by ID (in production, maintain a mapping of user IDs to socket IDs)
      // For now, emit to all sockets for demonstration
      const message: ChatMessage = {
        id: `priv_msg_${Date.now()}_${socket.id}`,
        senderId: data.senderId,
        senderName: data.senderName,
        channelId: ChatChannel.PRIVATE,
        content: data.content,
        timestamp: new Date(),
        messageType: MessageType.TEXT
      };

      // In a real implementation, you'd look up the recipient's socket ID
      // For now, emitting to all for demo purposes
      socket.broadcast.emit('private-message-received', message);
    });

    // Handle battle requests
    socket.on('request-battle', (battleRequest: PlayerBattleRequest) => {
      // In a real app, this would add the player to a matchmaking queue
      // For now, simulate finding an opponent and starting a battle
      const battleData = {
        battleId: `battle_${Date.now()}`,
        player1Id: battleRequest.playerId,
        player2Id: 'opponent_123', // Would come from queue
        mode: battleRequest.mode
      };

      // Emit battle start event
      socket.emit('battle-started', battleData);
    });

    // Handle battle actions during a battle
    socket.on('battle-action', (actionData: { battleId: string, action: string, target: string }) => {
      // In a real app, this would process the battle action on the server
      // For now, just broadcast the action to battle participants
      io.to(actionData.battleId).emit('battle-action-received', actionData);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      
      // Remove player from online list
      onlinePlayers = onlinePlayers.filter(player => player.id !== socket.id);
      
      // Broadcast updated online players list
      io.emit('online-players-update', onlinePlayers);
    });

    // Handle ping/pong for connection health
    socket.on('ping', () => {
      socket.emit('pong');
    });
  });
};
