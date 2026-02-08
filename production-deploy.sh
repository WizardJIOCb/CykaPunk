#!/bin/bash

# Production deployment script for CykaPunk - run directly on the server
echo "Starting CykaPunk production deployment..."

# Navigate to project directory
cd /var/www/game.cyka.lol

# Stop all services first (similar to stop-dev.bat approach)
echo "Stopping all services..."
# Stop backend processes
sudo systemctl stop cykapunk-backend 2>/dev/null || pkill -f "node.*backend" 2>/dev/null || true
# Stop frontend processes
sudo systemctl stop cykapunk-frontend 2>/dev/null || pkill -f "node.*frontend" 2>/dev/null || true
# Stop Docker containers
docker stop cykapunk-postgres 2>/dev/null || true

echo "Services stopped successfully"

# Pull latest changes from git
echo "Pulling latest changes from git..."
git pull origin main

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install --production

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install --production

cd ..

# Start Docker containers (similar to start-dev.bat approach)
echo "Starting Docker containers..."
docker start cykapunk-postgres 2>/dev/null || docker run --name cykapunk-postgres -e POSTGRES_USER=cykapunkuser -e POSTGRES_PASSWORD=cykapunkpass -e POSTGRES_DB=cykapunk -p 5432:5432 -d postgres:15

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Apply database migrations
echo "Applying database migrations..."
cd backend
npx drizzle-kit push:pg

cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Start services (similar to start-dev.bat approach)
echo "Starting services..."

# Start backend with PM2 or as systemd service
if command -v pm2 &> /dev/null; then
  cd backend
  pm2 start dist/server.js --name "cykapunk-backend" || pm2 restart cykapunk-backend
  cd ..
elif [ -f "/etc/systemd/system/cykapunk-backend.service" ]; then
  sudo systemctl start cykapunk-backend
else
  # Fallback: start in background
  cd backend
  nohup node dist/server.js > backend.log 2>&1 &
  cd ..
fi

# Start frontend with PM2 or as systemd service
if command -v pm2 &> /dev/null; then
  cd frontend
  pm2 serve dist 5173 --spa --name "cykapunk-frontend" || pm2 restart cykapunk-frontend
  cd ..
elif [ -f "/etc/systemd/system/cykapunk-frontend.service" ]; then
  sudo systemctl start cykapunk-frontend
else
  # Fallback: start in background
  cd frontend
  nohup npx serve -s dist -l 5173 > frontend.log 2>&1 &
  cd ..
fi

# Verify services are running
echo "Verifying services..."
sleep 5

if curl -f http://localhost:3001/api/health >/dev/null 2>&1; then
  echo "✅ Backend is running"
else
  echo "❌ Backend failed to start"
fi

if curl -f http://localhost:5173 >/dev/null 2>&1; then
  echo "✅ Frontend is running"
else
  echo "❌ Frontend failed to start"
fi

echo "CykaPunk deployment completed successfully!"
echo "Check: http://game.cyka.lol"