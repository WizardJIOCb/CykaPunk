@echo off
SETLOCAL

echo ========================================
echo CYKAPUNK DATABASE MIGRATION TOOL
echo ========================================
echo.

REM Check if Docker is running
echo Checking Docker status...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running or not accessible
    echo Please start Docker Desktop and try again
    pause
    exit /b 1
)
echo ✓ Docker is running
echo.

REM Check if PostgreSQL container exists
echo Checking PostgreSQL container...
docker inspect cykapunk-postgres >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ PostgreSQL container found
    REM Check if container is running
    for /f "" %%i in ('docker inspect -f "{{.State.Running}}" cykapunk-postgres 2^>nul') do set running=%%i
    if "%running%"=="true" (
        echo ✓ PostgreSQL container is already running
    ) else (
        echo Starting PostgreSQL container...
        docker start cykapunk-postgres >nul
        if %errorlevel% neq 0 (
            echo ERROR: Failed to start PostgreSQL container
            pause
            exit /b 1
        )
        echo ✓ PostgreSQL container started
        echo Waiting for database to be ready...
        timeout /t 10 /nobreak >nul
    )
) else (
    echo Creating PostgreSQL container...
    docker run --name cykapunk-postgres -e POSTGRES_USER=cykapunkuser -e POSTGRES_PASSWORD=cykapunkpass -e POSTGRES_DB=cykapunk -p 5432:5432 -d postgres:15
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create PostgreSQL container
        pause
        exit /b 1
    )
    echo ✓ PostgreSQL container created
    echo Waiting for database initialization...
    timeout /t 15 /nobreak >nul
)

echo.
echo Testing database connectivity...
docker exec cykapunk-postgres pg_isready -U cykapunkuser -d cykapunk >nul
if %errorlevel% neq 0 (
    echo ERROR: Database is not ready
    echo Please wait a moment and try again
    pause
    exit /b 1
)
echo ✓ Database is ready
echo.

REM Check current database state
echo Current database tables:
docker exec cykapunk-postgres psql -U cykapunkuser -d cykapunk -c "\dt" 2>nul
echo.

REM Navigate to backend directory
echo Changing to backend directory...
cd /d C:\Projects\cykapunk\backend
if %errorlevel% neq 0 (
    echo ERROR: Could not navigate to backend directory
    pause
    exit /b 1
)
echo ✓ In backend directory
echo.

REM Check if node_modules exists
echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies found
)
echo.

REM Run Drizzle Kit checks
echo Running Drizzle Kit configuration check...
npx drizzle-kit check:pg
if %errorlevel% neq 0 (
    echo WARNING: Configuration check failed, but continuing...
) else (
    echo ✓ Configuration check passed
)
echo.

REM Show migration plan
echo Current schema state:
docker exec cykapunk-postgres psql -U cykapunkuser -d cykapunk -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" 2>nul
echo.

echo ========================================
echo Ready to apply migrations
echo ========================================
echo This will:
echo 1. Push current schema to database
echo 2. Create/update all tables
echo 3. Preserve existing data (if any)
echo.
choice /C YN /M "Continue with migration"
if %errorlevel% equ 2 (
    echo Migration cancelled
    exit /b 0
)

echo.
echo Applying database migrations...
npx drizzle-kit push:pg
if %errorlevel% neq 0 (
    echo ERROR: Migration failed
    echo Check the error message above
    pause
    exit /b 1
)

echo.
echo ✓ Migration completed successfully!
echo.
echo Final database state:
docker exec cykapunk-postgres psql -U cykapunkuser -d cykapunk -c "\dt"
echo.

echo ========================================
echo MIGRATION COMPLETE
echo ========================================
echo Database is ready for use
echo You can now start the application with start-dev.bat
echo ========================================
echo.

pause