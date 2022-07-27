# sveltekit-edge-guestbook

Demo for a blog post about building a guest book with SvelteKit and Upstash Redis and deployed to Vercel Edge Functions.

To run locally, you will need to create an Upstash instance and put the required keys in a `.env` file. See `sample.env` for an example. You can find the required values in the "REST API" section of your database settings in the Upstash console.

[Live demo](https://sveltekit-edge-guestbook.vercel.app/)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
