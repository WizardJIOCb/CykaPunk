@echo off
title CykaPunk Development Shutdown

echo Stopping CykaPunk Development Environment...
echo.

REM Kill processes running on common ports used by the app
echo Killing processes on port 3000 (backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a 2>nul
taskkill /f /im node.exe 2>nul

echo Killing processes on port 5173 (frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do taskkill /f /pid %%a 2>nul

REM Kill processes by window title (more targeted approach)
echo Killing CykaPunk development processes...
taskkill /f /fi "WINDOWTITLE eq CykaPunk Backend" 2>nul
taskkill /f /fi "WINDOWTITLE eq CykaPunk Frontend" 2>nul

REM Alternative: Kill all Node.js processes (be careful with this)
echo Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul

echo.
echo Development servers stopped!
echo Press any key to exit...
pause >nul