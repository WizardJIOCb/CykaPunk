import React, { useState } from 'react';
import { ChatChannel, OnlinePlayer } from '../../../shared/types';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  channel: ChatChannel;
}

export const ChatPanel: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<ChatChannel>(ChatChannel.GENERAL);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Player1',
      content: 'Hello everyone!',
      timestamp: new Date(Date.now() - 300000),
      channel: ChatChannel.GENERAL
    },
    {
      id: '2',
      sender: 'Player2',
      content: 'Hi there!',
      timestamp: new Date(Date.now() - 240000),
      channel: ChatChannel.GENERAL
    },
    {
      id: '3',
      sender: 'CyberBot',
      content: 'Welcome to CykaPunk! Use /help for commands',
      timestamp: new Date(Date.now() - 180000),
      channel: ChatChannel.GENERAL
    }
  ]);
  
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([
    {
      id: 'player1',
      username: 'Player1',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Main Plaza'
    },
    {
      id: 'player2',
      username: 'Player2',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Market District'
    },
    {
      id: 'player3',
      username: 'ShadowRunner',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Underground'
    },
    {
      id: 'player4',
      username: 'NeonNinja',
      isConnected: true,
      lastSeen: new Date(),
      location: 'Corporate Tower'
    }
  ]);
  
  const [showPrivateChat, setShowPrivateChat] = useState<boolean>(false);
  const [privateRecipient, setPrivateRecipient] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You', // In a real app, this would be the logged-in user
      content: message,
      timestamp: new Date(),
      channel: activeChannel
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const handlePrivateMessage = (recipient: string) => {
    setPrivateRecipient(recipient);
    setShowPrivateChat(true);
    setActiveChannel(ChatChannel.PRIVATE);
  };
  
  const handleSendPrivateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: message,
      timestamp: new Date(),
      channel: ChatChannel.PRIVATE
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const filteredMessages = messages.filter(msg => msg.channel === activeChannel);

  return (
    <div className="h-full flex flex-col bg-gray-800 cyber-border">
      {/* Channel Tabs */}
      <div className="border-b border-gray-700 flex">
        {Object.values(ChatChannel).map((channel) => (
          <button
            key={channel}
            className={`flex-1 py-2 px-3 text-sm font-medium uppercase tracking-wide ${
              activeChannel === channel
                ? 'bg-cyan-900 text-cyan-100'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveChannel(channel)}
          >
            {channel.charAt(0).toUpperCase() + channel.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-3 space-y-2 max-h-[calc(100vh-200px)] bg-gray-900/30">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className="text-sm terminal-text">
            <span className="font-semibold text-cyan-400">{msg.sender}:</span>{' '}
            <span className="text-gray-300">{msg.content}</span>
            <span className="text-xs text-gray-500 float-right">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Online Players */}
      <div className="border-t border-gray-700 p-3 bg-gray-900/20">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Online Players ({onlinePlayers.length})</h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {onlinePlayers.map((player) => (
            <div key={player.id} className="text-xs text-gray-300 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">{player.username}</span>
                <span className="text-green-500 text-xs">●</span>
              </div>
              <div className="flex space-x-1">
                <button 
                  className="text-cyan-400 hover:text-cyan-300 text-xs"
                  onClick={() => handlePrivateMessage(player.username)}
                >
                  PM
                </button>
                <span className="text-gray-500 text-xs">{player.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form 
        onSubmit={activeChannel === ChatChannel.PRIVATE ? handleSendPrivateMessage : handleSendMessage} 
        className="border-t border-gray-700 p-2"
      >
        <div className="flex">
          {activeChannel === ChatChannel.PRIVATE && (
            <div className="bg-cyan-900 px-3 py-2 text-sm terminal-text rounded-l">
              PM to: {privateRecipient}
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              activeChannel === ChatChannel.PRIVATE 
                ? `Private message to ${privateRecipient}...`
                : `Message #${activeChannel}...`
            }
            className={`${
              activeChannel === ChatChannel.PRIVATE ? 'rounded-none' : 'rounded-l'
            } flex-grow bg-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 input-cyber`}
          />
          <button
            type="submit"
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-r text-sm font-medium btn-cyber"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};