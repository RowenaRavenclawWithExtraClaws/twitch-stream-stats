# Twitch Stream Stats API

A web API for storing and quering streams data using the Twitch API. You can try it here https://twitch-stream-stats.herokuapp.com

## Installation and Running

- Just clone the repo.
- add .env file with the following keys:
  - `BASE_URL` Twitch API base url.
  - `CLIENT_ID` your Twitch client id.
  - `DATABASE_URL` your database url (local or remote).
  - `TOKEN` your secret token optained from the Twitch developer console.
- Setup a PostgreSQL database (local or remote).
- Migrate the following prisma schema.
- Run `node app.js`

## Project file structure

- `app.js` file acts as the entry point.
- `streams.js` file contains the streams class which stores and operates on streams data in memory.
- `Prisma` folder contains all the database schema and query logic.
- `inMemory` folder contains all the in-memory data operations logic.
- `helpers` folder contains constants, endpoint handlers and some utility functions

Note: I have implemented my own array helper functions, you can find them in `utility.js` file.

## Technologies used

- Node.js: `15.5.1`
- Restify: `^8.6.0`
- Prisma: `^3.4.0`

## Endpoints

- `/users/auth`

  - `GET`
  - query params: `username` or `access_token`
  - response: `{ username: string, allow_signin: boolean }`

- `/users/logout`

  - `GET`
  - query params: `username`
  - response: `statusCode: 204`

- `/streams/per-game`

  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

- `/streams/highest-viewers`

  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

- `/streams/median-viewers`

  - `GET`
  - response: `{ data: number }`

- `/streams/odd-viewers`

  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

- `/streams/even-viewers`

  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

- `/streams/same-viewers`

  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

- `/streams/top100`
  - `GET`
  - query params: `page`, `inmemory`
  - response: `{ page_count: number, data: Array<object> }`

## Prisma database schema

![schema](https://github.com/RowenaRavenclawWithExtraClaws/twitch-stream-stats/blob/main/api/schema.png)

## How to improve

### Add testing

- Use `Jest` and `supertest` libraries to test the API request.
- Intruduce some form of stress testing for the API. Not sure what it should be.

### Implement caching

- Use the Write-Around caching strategy (my favourite).
- Decide what to cache and when to do caching invalidation (The hardest thing!)
- Setup a `Redis` server to add the caching layer.
