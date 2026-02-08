@echo off
title CykaPunk Development Startup

echo Starting CykaPunk Development Environment...
echo.

REM Change to the project root directory
cd /d "%~dp0"

REM Check if PostgreSQL is running
net start | findstr "postgresql" >nul
if errorlevel 1 (
    echo WARNING: PostgreSQL service is not running. Please start PostgreSQL manually.
    echo.
)

REM Start backend and frontend in separate Command Prompt windows
start "CykaPunk Backend" cmd /k "cd /d %~dp0backend && npm install && npm run dev"
timeout /t 3 /nobreak >nul
start "CykaPunk Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo Development servers started!
echo - Backend will be available at http://localhost:3000
echo - Frontend will be available at http://localhost:5173
echo.
echo Press any key to exit...
pause >nul