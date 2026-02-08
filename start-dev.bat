@echo off
SETLOCAL

REM Kill any existing processes on our ports
echo Stopping any existing processes on ports 5173 and 3001...
taskkill /f /im node.exe /fi "WINDOWTITLE eq Backend*" >nul 2>&1
taskkill /f /im node.exe /fi "WINDOWTITLE eq Frontend*" >nul 2>&1

REM Start Docker containers if needed
echo Starting Docker containers...
docker start cykapunk-postgres >nul 2>&1 || (
    echo Container not found, checking if it exists but is stopped...
    docker ps -a --format "{{.Names}}" | findstr "^cykapunk-postgres$" >nul
    if %errorlevel% equ 0 (
        echo Removing existing stopped container...
        docker rm cykapunk-postgres >nul 2>&1
    )
    echo Creating and starting PostgreSQL container...
    docker run --name cykapunk-postgres -e POSTGRES_USER=cykapunkuser -e POSTGRES_PASSWORD=cykapunkpass -e POSTGRES_DB=cykapunk -p 5432:5432 -d postgres:15
    if %errorlevel% neq 0 (
        echo Failed to create PostgreSQL container. Please check your Docker installation.
        pause
        exit /b 1
    )
)

echo Verifying PostgreSQL is starting...

echo Verifying PostgreSQL is ready...
:check_db_ready
for /f "" %%i in ('docker inspect -f "{{.State.Running}}" cykapunk-postgres 2^>nul') do set running=%%i
if "%running%"=="true" (
    echo PostgreSQL container is running
    goto continue_after_db_check
) else (
    echo PostgreSQL container failed to start, recreating...
    docker stop cykapunk-postgres >nul 2>&1
    docker rm cykapunk-postgres >nul 2>&1
    goto create_postgres_container
)

REM Wait for PostgreSQL to become ready with limited checks
set attempt=0
set max_attempts=6

echo Waiting for PostgreSQL to become ready...
echo Testing database connection immediately...

echo Verifying database connectivity...
timeout /t 2 /nobreak >nul

:create_postgres_container
echo Creating and starting PostgreSQL container...
docker run --name cykapunk-postgres -e POSTGRES_USER=cykapunkuser -e POSTGRES_PASSWORD=cykapunkpass -e POSTGRES_DB=cykapunk -p 5432:5432 -d postgres:15
if %errorlevel% neq 0 (
    echo Failed to create PostgreSQL container. Please check your Docker installation.
    pause
    exit /b 1
)

echo Waiting for PostgreSQL to initialize...
timeout /t 10 /nobreak >nul
goto check_db_ready

:continue_after_db_check

REM Start backend server on port 3001 in development mode
echo Starting backend server on port 3001 (dev mode with hot-reload)...
echo.
echo ================================
echo DEVELOPMENT SERVERS STARTED
echo ================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Use stop-dev.bat to properly stop all services.
echo ================================
echo.
echo Starting servers...
REM Ensure we're in the right directory
cd /d C:\Projects\cykapunk

echo Launching backend server...
start "Backend - CykaPunk" cmd /k "cd /d C:\Projects\cykapunk\backend && echo Starting backend... && npm run dev && pause"

echo Launching frontend server...
start "Frontend - CykaPunk" cmd /k "cd /d C:\Projects\cykapunk\frontend && echo Starting frontend... && npm run dev && pause"

echo Servers launched. This window will stay open to keep the process running.
echo Close this window or run stop-dev.bat to stop all services.

REM Auto-exit this launcher window after a short delay to avoid the pause
timeout /t 3 /nobreak >nul
exit /b 0