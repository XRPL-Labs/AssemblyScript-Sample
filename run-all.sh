#!/usr/bin/env bash

echo
echo 'Running AssemblyScript using as-loader:'
echo
node ./run-wasm/as-loader.js as
echo
echo '------'
echo 'Running AssemblyScript using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js as
echo
echo '------'
echo 'Running AssemblyScript using wasi (wasmer):'
echo
node ./run-wasm/wasi-loader.js as
echo
echo "============================="

##############################################################################

echo
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
echo 'Running C using wasi (wasmer):'
echo
node ./run-wasm/wasi-loader.js c
echo
echo "============================="

##############################################################################

echo
echo 'Running C++ using as-loader:'
echo
node ./run-wasm/as-loader.js cpp
echo
echo '------'
echo 'Running C++ using native WebAssembly.instantiate:'
echo
node ./run-wasm/node.js cpp
echo
echo '------'
echo 'Running C++ using wasi (wasmer):'
echo
node ./run-wasm/wasi-loader.js cpp
echo
