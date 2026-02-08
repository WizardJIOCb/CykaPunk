#!/bin/bash
# Deployment script for CykaPunk

echo "🚀 Starting CykaPunk deployment..."

# Navigate to project directory
cd /var/www/game.cyka.lol

# Pull latest changes
echo "📥 Pulling latest code from GitHub..."
git pull origin master

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for database to be ready
echo "⏱️ Waiting for database to start..."
sleep 10

# Navigate to backend
cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Run database migrations (if any)
echo "📋 Running database setup..."
# Add migration commands here when ready

# Navigate to frontend
cd ../frontend

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
npm install

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Copy build to dist directory
echo "📂 Copying build files..."
cd ..
mkdir -p dist
cp -r frontend/dist/* dist/

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data dist/
chmod -R 755 dist/

# Reload nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo "✅ Deployment completed successfully!"
echo "🎮 Your CykaPunk game is now live at game.cyka.lol"