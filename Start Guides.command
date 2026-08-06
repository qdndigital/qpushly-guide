#!/bin/bash
# Qpushly GUIDES (docs hub) — double-click launcher.
# Installs deps on first run, starts the Astro docs dev server, opens the browser.
cd "$(dirname "$0")" || { echo "Cannot find project folder."; read -r -p "Press Return to close."; exit 1; }
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
clear
echo "════════════════════════════════════════"
echo "  Qpushly · Guides (docs hub)"
echo "════════════════════════════════════════"
echo

if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm/node is not installed.  Install Node with:  brew install node"
  read -r -p "Press Return to close."; exit 1
fi

if [ ! -x "node_modules/.bin/astro" ]; then
  echo "📦 Installing dependencies (first run only)…"
  npm install || { echo "❌ npm install failed."; read -r -p "Press Return to close."; exit 1; }
  echo
fi

URL="http://localhost:4323"
( sleep 5; open "$URL" ) &
echo "🚀 Starting the guides site  →  $URL"
echo "   Leave this window open while you work · Ctrl+C to stop."
echo
npm run dev -- --port 4323

echo; echo "Server stopped."; read -r -p "Press Return to close."
