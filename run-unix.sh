#!/usr/bin/env bash
# Hydrate-ERP iniciador macOS / Linux
# Pré-requisitos: Node.js + npm instalados

ROOT_DIR="$(dirname "$(readlink -f "$0")")"

echo "Iniciando Hydrate-ERP (Unix)..."

cd "$ROOT_DIR/backend"
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências do backend..."
  npm install
fi
echo "Iniciando backend em background (logs em backend.log)..."
nohup npm start > "$ROOT_DIR/backend/backend.log" 2>&1 &

cd "$ROOT_DIR/frontend"
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências do frontend..."
  npm install
fi
echo "Iniciando frontend em background (logs em frontend.log)..."
nohup npm run dev > "$ROOT_DIR/frontend/frontend.log" 2>&1 &

echo "Aguardando inicialização..."
sleep 5

URL="http://localhost:5173"
if which xdg-open > /dev/null; then
  xdg-open "$URL"
elif which open > /dev/null; then
  open "$URL"
else
  echo "Abra manualmente: $URL"
fi

echo "Pronto. Logs: backend/backend.log e frontend/frontend.log"
