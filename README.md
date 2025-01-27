# Smart Home Display (Frontend)

![teaser.gif](docs/teaser.png)

> Customizable static web app that can be run on a Raspberry Pi or any other device to show useful data like calendar or todoist infos.


## Features

This project includes the following modules which you can enable or disable by setting the corresponding .env variables:

- Home Screen
- Todoist Overview
- Calendar (ICS) Overview

> ⚠️ More modules will be added in the future. Feel free to contribute!

## Installation

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Create a `.env` file in the root directory by copying the `.env.example` file


## Configuration

The `.env` file contains the following variables:

### `REACT_APP_TODOIST_API_KEY`

Set this variable to your Todoist API key to enable todoist integration. If not set, the todoist module will be disabled.

### `REACT_APP_CALENDAR_WEBCAL_URLS`

Set this variable to a define one or multiple webcal URLs to enable the calendar integration. 

### `REACT_APP_CALENDAR_WEBCAL_NAMES`

Set this variable to define the names of the calendars. The names should be separated by a comma and the order should match the order of the URLs in `REACT_APP_CALENDAR_WEBCAL_URLS`.

### `REACT_APP_CALENDAR_WEBCAL_COLORS`

Supported colors:

`red`,`orange`,`amber`,`yellow`,`lime`,`green`,`emerald`,`teal`,`cyan`,`sky`,`blue`,`indigo`,`violet`,`purple`,`fuchsia`,`pink`,`rose`,`slate`,`gray`,`zinc`,`neutral`, `stone`

Set this variable to define the colors of the calendars. The colors should be separated by a comma and the order should match the order of the URLs in `REACT_APP_CALENDAR_WEBCAL_URLS`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `build/` directory.


## Run

Run `yarn serve` to start the proxy server and serve the static files (e.g. on your raspberry pi).