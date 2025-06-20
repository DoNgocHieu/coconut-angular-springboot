@echo off
title Coconut Music - Full Stack Application
echo.
echo 🥥🎵 COCONUT MUSIC - FULL STACK APPLICATION 🎵🥥
echo.
echo Starting both Backend and Frontend...
echo.
echo ⚡ Backend will start on: http://localhost:8080
echo ⚡ Frontend will start on: http://localhost:4201
echo ⚡ Database Console: http://localhost:8080/h2-console
echo.

REM Start Backend
echo 🔧 Starting Backend (Spring Boot)...
start "Coconut Music Backend" cmd /k "cd /d d:\works\coding\coconut-angular-springboot\backend && .\mvnw.cmd spring-boot:run"

REM Wait for backend to start
echo 🕐 Waiting for backend to initialize...
timeout /t 15 /nobreak > nul

REM Start Frontend
echo 🎨 Starting Frontend (Angular)...
start "Coconut Music Frontend" cmd /k "cd /d d:\works\coding\coconut-angular-springboot\frontend\coconut-music-frontend && ng serve --port 4201 --open"

echo.
echo ✅ Both services are starting up!
echo ✅ Backend: http://localhost:8080
echo ✅ Frontend: http://localhost:4201
echo.
echo 💡 You can close this window once both services are running.
echo.
pause
