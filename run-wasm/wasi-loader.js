const fs = require("fs")
const { WASI } = require("@wasmer/wasi")
const nodeBindings = require("@wasmer/wasi/lib/bindings/node")

const wasmFilePath = __dirname + '/../build/' + process.argv[2] + '-optimized.wasm'

const memory = new WebAssembly.Memory({ initial: 1, maximum: 1 })

const s = (buffer, ptr) => {
  const len = new Uint32Array(buffer)[ptr + -4 >>> 2] >>> 1
  const arr = new Uint16Array(buffer, ptr, len)
  if (len <= 32) {
    return String.fromCharCode.apply(String, arr)
  }
  return (new TextDecoder('utf-16le')).decode(arr)
}  

// Instantiate a new WASI Instance
let wasi = new WASI({
  args: [wasmFilePath],
  bindings: {
    ...(nodeBindings.default || nodeBindings),
    fs: fs
  }
})

const start = async pathToWasmFile => {
  let wasmBytes = new Uint8Array(fs.readFileSync(pathToWasmFile)).buffer

  // Instantiate the WebAssembly file
  let wasmModule = await WebAssembly.compile(wasmBytes);
  let instance = await WebAssembly.instantiate(wasmModule, {
    // ...wasi.getImports(wasmModule)
    env: {
      // __memory_base: 0,
      memory,
      jsHello(someInt) {
        console.log('jsHello called:')
        console.log('  -> someInt', someInt)
      },
      abort(_msg, _file, line, column) {
        console.error("abort called at:" + line + ":" + column)
      },
      // For AssemblyScript, where the sample uses Math.random
      seed() {
        return Date.now()
      }
    }
  });


  // Start the WASI instance
  wasi.start(instance)

  instance.exports.main()

  console.log({
    // exports: instance.exports,
    // strFromWasmToJs: s(instance.exports.strFromWasmToJs())
    // strFromWasmToJs: instance.exports.strFromWasmToJs()
    strFromWasmToJs: instance.exports.strFromWasmToJs(),
    _s_strFromWasmToJs: s(memory.buffer, instance.exports.strFromWasmToJs()),
    // memory: memory.buffer
  })
}


start(wasmFilePath)
