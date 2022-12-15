# React - Vite Federation Demo

This example demos consumption of federated modules from a vite bundle. `app` (react based) depends on a component exposed by `shared` app (react based).

## Running

First, run `pnpm install`, then `pnpm build` and `pnpm preview`. This will build and serve both `shared` and `app` on ports 5000, 5001 respectively.

- HOST (shared): [localhost:3000](http://localhost:3000/)
- REMOTE (app): [localhost:3001](http://localhost:3001/)

`CTRL + C` can only stop the host server. You can run `pnpm stop` to stop all services.
