@echo off
cd /d "C:\Users\Makkov\Desktop\Cartgram landing page (Codex)"
echo ==== %DATE% %TIME% ====>> "%TEMP%\cartgram-start.log"
"C:\Program Files\nodejs\npm.cmd" run start -- -p 3001 >> "%TEMP%\cartgram-start.log" 2>&1
