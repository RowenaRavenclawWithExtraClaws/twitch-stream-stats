# Stream stats

Twitch Stream Stats is a web app that displays some stream stats extracted the Twitch API. You can start using the app here https://stream-stats.vercel.app/

## Run locally

Just clone the repo and run `docker-compose up`

## Features

- Sign in using Twitch account.
- Display some stream stats and insights.

## Project folders

- `webapp` contains code for the web application
- `api` contains code for the API that is consumed by the web application.

NOTE: IT IS NOT A MONOLITHIC APPLICATION. The web application, The API and the database are deployed separately.

For more information see [web app doc](webapp/README.md) and [API doc](api/README.md)
