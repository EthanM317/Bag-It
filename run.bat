@echo off

@REM Install dependencies if needed
if not exist node_modules\ (
    call npm install
)

echo:
echo Running test server, press 'ctrl + c' to exit...
echo:
call npm run dev

pause