#!/bin/bash

# Start the local web server
yarn --cwd /home/pi/smart-home-screen run serve &

# Wait for the server to start
sleep 10

# Open Chromium in kiosk mode
chromium-browser \
	--noerrdialogs \
	--hide-crash-restore-bubble \
	--disable-infobars \
	--force-device-scale-factor=1.00 \
	--enable-features=OverlayScrollbar \
	--kiosk http://localhost:3000