# Twitch Stream Stats Web Application

Web-based client application to display some stats and insights on streams data using the Twitch API.

## Installation and Running

Just clone the repo and run 'npm run dev'

## Technologies used

- Next.js: `12.0.2`
- React: `17.0.2`
- Redux: `^4.1.2`
- Redux Toolkit: `^1.6.2`
- TypeScript: `4.4.4`

Others: SCSS, Material UI

## Fronend Architecture

![frontend-arch](https://github.com/rowenaravenclawwithextraclaws/nasser-blockchain-portal/blob/main/assets/frontend-arch.png)

## How to improve

### Add testing to both frontend and backend

- Use `Jest` and `supertest` libraries to test the API request.
- Intruduce some form of stress testing for the API. Not sure what it should be.
- Write unit test for components and functions in the helpers.js files.

### Implement caching

- Use the Write-Around caching strategy (my favourite).
- Decide what to cache and when to do caching invalidation (The hardest thing!)
- Setup a `Redis` server to add the caching layer.

### Add more functionality to the client

- Add extra page for displaying all the block data.
- View blockchain.
- View transaction details.
