# Twitch Stream Stats

Twitch Stream Stats is a web app that displays some stream stats extracted the Twitch API. You can start using the app here https://stream-stats.vercel.app/

## Run locally

Just clone the repo and run `docker-compose up`

## Requirements Checks

- Sign in using Twitch account. ✅
- Seed a database with the current top 1000 live streams on Twitch. ✅
- Shuffle this data before inserting it in your database. ✅
- Store the user in the database once they login. ✅
- Display some stream stats and insights: ✅
  - Total amount of streams per game. ✅
  - Highest viewer count stream per game. ✅
  - Median amount of viewers for all streams. ✅
  - Streams with an odd number of viewers. ✅
  - Streams with an even number of viewers. ✅
  - List of top 100 streams that can be sorted descending. ✅
  - List of top 100 streams that can be sorted ascending. ❌
  - Streams with the same amount of viewers. ✅
- Not using built in helper functions in the backend. ✅
- Not using built in helper functions in the frontend. ❌
- Update the top streams in your database every 15 minutes. ✅
- Expire a user’s session after 1 hour, requiring them to log back in. ✅
- Host your project somewhere so it’s publicly available for testing. ✅

## Project folders

- `webapp` contains code for the web application
- `api` contains code for the API that is consumed by the web application.

## Project architecture

![project-arch](https://github.com/RowenaRavenclawWithExtraClaws/twitch-stream-stats/blob/main/project-arch.png)

NOTE: IT IS NOT A MONOLITHIC APPLICATION. The web application, The API and the database are deployed separately.

For more information see [web app doc](webapp/README.md) and [API doc](api/README.md)
