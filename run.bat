@echo off
title Pet Adoption Management System
echo ===================================================================
echo             PET ADOPTION MANAGEMENT SYSTEM
echo       Spring Boot Full Stack Application Launcher
echo ===================================================================
echo.

where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Apache Maven was not found in your PATH.
    echo Please install Maven or run this project using IntelliJ / Eclipse / VS Code.
    pause
    exit /b
)

echo Starting Pet Adoption Management System on http://localhost:8080 ...
echo (Press Ctrl+C to stop the application)
echo.

mvn spring-boot:run
pause
