@echo off
REM Hydrate-ERP iniciador Windows
REM Pré-requisitos: Node.js + npm instalados globalmente

setlocal enabledelayedexpansion
set ROOT=%~dp0

echo Iniciando Hydrate-ERP (Windows)...

REM --- Backend ---
if not exist "%ROOT%backend\node_modules" (
  echo Instalando dependências do backend...
  pushd "%ROOT%backend"
  npm install
  popd
)
echo Iniciando backend (será executado em janela minimizada)...
start "Hydrate Backend" /min cmd /c "cd /d "%ROOT%backend" && npm start"

REM --- Frontend ---
if not exist "%ROOT%frontend\node_modules" (
  echo Instalando dependências do frontend...
  pushd "%ROOT%frontend"
  npm install
  popd
)
echo Iniciando frontend (será executado em janela minimizada)...
start "Hydrate Frontend" /min cmd /c "cd /d "%ROOT%frontend" && npm run dev"

REM Aguarda e abre o navegador na URL padrão do Vite
timeout /t 6 >nul
start "" "http://localhost:5173"

echo Pronto. Feche esta janela se quiser ocultar mensagens.
pause
