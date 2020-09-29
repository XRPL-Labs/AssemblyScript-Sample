#!/usr/bin/env bash

clear

npm run asbuild:custom

echo '------'

echo 'Running using as-loader:'
echo
node ./run-wasm/as-loader.js

echo
echo '------'

echo 'Running using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js

echo
echo '------'
