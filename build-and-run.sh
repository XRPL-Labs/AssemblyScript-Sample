#!/usr/bin/env bash

clear

echo "Build: as (AssemblyScript)"
npm run asbuild:custom

echo '------'

echo 'Running as (AssemblyScript) using as-loader:'
echo
node ./run-wasm/as-loader-as.js

echo
echo '------'

echo 'Running as (AssemblyScript) using native WebAssembly.instantiate:'
echo
node ./run-wasm/node-as.js

echo
echo '------'
