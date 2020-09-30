# AssemblyScript Sample (pre Hooks)

This sample code:

- Allows you to code AssemblyScript in `/assembly`
- Allows you to build it (eg. `npm run asbuild:custom`, see `package.json` » `scripts`)
- Allows you to run it (eg `npm run full` (build & run), or manually: `node ./run-wasm/as-loader.js as`)

## Todo

- Notes on C/CPP
- Notes on ./build-and-run.sh

## Getting started

1. Clone
2. `npm install`

## Key concepts

1. Call JS fn from AS environment. Define JS side functions in `./run-wasm/as-loader.js` and define them as `@external` in eg `src/assembly/index.ts`.
2. Macro-like behaviour by using `import` fns in AS from other `.ts` files exporting functions, in eg `src/assembly/index.ts` & src/`assembly/someMacroLikeLib.ts`
