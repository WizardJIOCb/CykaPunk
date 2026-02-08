import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { ChatMessage, ChatChannel, MessageType, OnlinePlayer } from '../../../shared/types';

const router = express.Router();

// Get chat history for a channel
router.get('/history/:channel', authenticateToken, (req, res) => {
  const { channel } = req.params;
  
  // In a real app, this would fetch from the database
  const messages: ChatMessage[] = [
    {
      id: 'msg_1',
      senderId: 'user_1',
      senderName: 'Player1',
      channelId: channel as ChatChannel,
      content: 'Hello everyone!',
      timestamp: new Date(Date.now() - 300000),
      messageType: MessageType.TEXT
    },
    {
      id: 'msg_2',
      senderId: 'user_2',
      senderName: 'Player2',
      channelId: channel as ChatChannel,
      content: 'Hi there!',
      timestamp: new Date(Date.now() - 240000),
      messageType: MessageType.TEXT
    }
  ];
  
  res.json({ messages });
});

// Send a message to a channel
router.post('/send', authenticateToken, (req, res) => {
  const { channelId, content } = req.body;
  const user = (req as any).user;
  
  // In a real app, this would save to the database and broadcast via socket
  const message: ChatMessage = {
    id: `msg_${Date.now()}`,
    senderId: user.id,
    senderName: user.username,
    channelId: channelId as ChatChannel,
    content,
    timestamp: new Date(),
    messageType: MessageType.TEXT
  };
  
  res.json({ message, success: true });
});

// Get online players
router.get('/online', authenticateToken, (req, res) => {
  // In a real app, this would fetch from active socket connections
  const onlinePlayers: OnlinePlayer[] = [
    {
      id: 'user_1',
      username: 'Player1',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Main Plaza'
    },
    {
      id: 'user_2',
      username: 'Player2',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Market District'
    }
  ];
  
  res.json({ onlinePlayers });
});

// Get private messages with a user
router.get('/private/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;
  
  // In a real app, this would fetch private messages between users
  const messages: ChatMessage[] = [];
  
  res.json({ messages });
});

// Send a private message
router.post('/private', authenticateToken, (req, res) => {
  const { recipientId, content } = req.body;
  const user = (req as any).user;
  
  // In a real app, this would save to the database and send via socket
  const message: ChatMessage = {
    id: `priv_msg_${Date.now()}`,
    senderId: user.id,
    senderName: user.username,
    channelId: ChatChannel.PRIVATE,
    content,
    timestamp: new Date(),
    messageType: MessageType.TEXT
  };
  
  res.json({ message, success: true, recipientId });
});

export { router as chatRoutes };