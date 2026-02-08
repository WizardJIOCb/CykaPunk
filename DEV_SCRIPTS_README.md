# CykaPunk Development Scripts

## Overview
This project includes Windows batch scripts to easily start and stop the development environment with proper process management and console window control.

## Scripts

### start-dev.bat
Starts the complete development environment:
- Kills any existing processes on ports 5173 and 3001
- Starts/creates PostgreSQL Docker container (cykapunk-postgres)
- Launches backend server (port 3001) in a new console window
- Launches frontend server (port 5173) in a new console window
- Displays connection information

### stop-dev.bat
Stops the complete development environment:
- Kills backend processes (port 3001)
- Kills frontend processes (port 5173)
- Stops PostgreSQL Docker container
- Closes related console windows
- Performs aggressive cleanup of remaining processes

## Usage

### Starting Development Environment
```batch
start-dev.bat
```

This will:
1. Clean up any existing processes
2. Start PostgreSQL container
3. Open two new console windows:
   - Backend server (http://localhost:3001)
   - Frontend server (http://localhost:5173)

### Stopping Development Environment
```batch
stop-dev.bat
```

This will:
1. Stop all development processes
2. Close console windows
3. Stop Docker container
4. Perform cleanup

## Features

- **Automatic Process Management**: Kills conflicting processes before starting
- **Console Window Control**: Opens separate console windows for backend/frontend
- **Docker Integration**: Manages PostgreSQL container automatically
- **Aggressive Cleanup**: Ensures no zombie processes remain
- **Error Handling**: Provides clear error messages and recovery options

## Prerequisites

- Node.js and npm installed
- Docker Desktop running
- Windows operating system

## Ports Used

- **3001**: Backend server
- **5173**: Frontend development server
- **5432**: PostgreSQL database (Docker)

## Troubleshooting

If scripts fail to work:
1. Ensure Docker Desktop is running
2. Check that ports 3001, 5173, and 5432 are available
3. Run scripts as Administrator if permission issues occur
4. Manually stop any conflicting processes

## Manual Commands (Alternative)

If scripts don't work, you can manually run:

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Start PostgreSQL:**
```bash
docker run --name cykapunk-postgres -e POSTGRES_USER=cykapunkuser -e POSTGRES_PASSWORD=cykapunkpass -e POSTGRES_DB=cykapunk -p 5432:5432 -d postgres:15
```