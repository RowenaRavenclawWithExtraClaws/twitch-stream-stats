# Twitch Stream Stats Web Application

Web-based client application to display some stats and insights on streams data using the Twitch API.

## Run locally

- Just clone the repo.
- Run 'npm run dev'.
- Visit `localhost:3000` to see this beauty!

## Technologies used

- Next.js: `12.0.2`
- React: `17.0.2`
- Redux: `^4.1.2`
- Redux Toolkit: `^1.6.2`
- TypeScript: `4.4.4`

Others: SCSS, Material UI

## Architecture

![arch](https://github.com/RowenaRavenclawWithExtraClaws/twitch-stream-stats/blob/main/webapp/frontend-arch.png)

## How to improve

### Add testing

- Use `react-testing-framework` to test component rendering and pagination logic.
- Use `Jest` to test the helper functions in `utility.ts` file

### Add more functionality

- Sort and search capablities on all of the tables.
- Display more info about a stream in a modal.
