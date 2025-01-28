#!/bin/bash

# Start the local web server
yarn --cwd ../ serve &

# Wait for the server to start
sleep 10

# Open Chromium in kiosk mode
chromium-browser --kiosk http://localhost:3000