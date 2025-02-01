# Nuxt Minimal Starter

### Recommended Node version: 18.20.5

## If you find any problem with any package when you stop and start again locally, try to remove node modules and package-lock.json (rm -rf node_modules package-lock.json) and run npm install after.
## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

## Testing:

```bash
# npm
npm run test
```
## Dependencies

- **@pinia/nuxt**: Integration of Pinia (state management library) with Nuxt 3.
- **@tailwindcss/vite**: Vite plugin for integrating Tailwind CSS into your Nuxt 3 application.
- **autoprefixer**: Adds vendor prefixes to CSS automatically for better browser compatibility.
- **axios**: HTTP client for making API requests from your Nuxt 3 application.
- **nuxt**: The core framework for building your application, providing server-side rendering and other features.
- **tailwindcss**: Utility-first CSS framework for styling the application.
- **uuid**: Generates unique IDs.
- **vue**: The Vue.js framework used as the foundation of the Nuxt 3 application.
- **vue-router**: Router library for handling client-side routing within the application.

## DevDependencies

- **@pinia/testing**: Utilities for testing Pinia stores in your frontend.
- **@vitejs/plugin-vue**: Vite plugin for handling Vue 3 files during development and builds.
- **@vue/test-utils**: Utility library for testing Vue components.
- **jsdom**: Simulates a browser environment for testing in Node.js.
- **vitest**: Testing framework for running unit and integration tests in the frontend.
