#!/bin/bash

# Simple script to start a local web server for the Virtual Band website

echo "🎵 Starting Virtual Band Website..."
echo ""
echo "Opening browser at http://localhost:8000/START_HERE.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to open the browser (works on macOS, Linux, and Windows with Git Bash)
if command -v open &> /dev/null; then
    # macOS
    sleep 2 && open "http://localhost:8000/START_HERE.html" &
elif command -v xdg-open &> /dev/null; then
    # Linux
    sleep 2 && xdg-open "http://localhost:8000/START_HERE.html" &
elif command -v start &> /dev/null; then
    # Windows
    sleep 2 && start "http://localhost:8000/START_HERE.html" &
fi

# Start the Python HTTP server
python3 -m http.server 8000
