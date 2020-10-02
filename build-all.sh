#!/usr/bin/env bash

clear

echo "Build: AssemblyScript"
npm run asbuild:custom

echo "Build: C"
wasmcc src/c/index.c -o build/c-optimized.wasm -Wl,--allow-undefined

echo "Build: CPP"
wasmc++ src/cpp/index.cpp -o build/cpp-optimized.wasm -Wl,--allow-undefined
