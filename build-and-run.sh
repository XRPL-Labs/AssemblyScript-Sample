#!/usr/bin/env bash

clear

echo "Build: as (AssemblyScript)"
npm run asbuild:custom

echo '------'

echo 'Running as (AssemblyScript) using as-loader:'
echo
node ./run-wasm/as-loader.js as

echo
echo '------'

echo 'Running as (AssemblyScript) using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js as

echo
echo '========================'

echo "Build: CPP"
wasmcc src/c/index.c -o build/c-optimized.wasm -Wl,--allow-undefined
wasmc++ src/cpp/index.cpp -o build/cpp-optimized.wasm -Wl,--allow-undefined
#docker run --rm -v $(pwd):/src emscripten/emsdk:latest emcc -O3 -s WASM=1 -s FILESYSTEM=0 -s STANDALONE_WASM -Wl,--no-entry -s EXPORTED_FUNCTIONS="['_main','_strFromWasmToJs']" -s ALLOW_TABLE_GROWTH -s ALLOW_MEMORY_GROWTH src/cpp/index.cpp -o build/CPP-optimized.wasm
#  

echo '------'

echo 'Running C using as-loader:'
echo
node ./run-wasm/as-loader.js c

echo
echo '------'

echo 'Running C using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js c

echo
echo '------'

echo '------'

echo 'Running CPP using as-loader:'
echo
node ./run-wasm/as-loader.js cpp

echo
echo '------'

echo 'Running CPP using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js cpp

echo
echo '------'
