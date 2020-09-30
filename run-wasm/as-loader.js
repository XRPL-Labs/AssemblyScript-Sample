const fs = require("fs")
const loader = require("@assemblyscript/loader")

const compiledWasm = fs.readFileSync(__dirname + '/../build/' + process.argv[2] + '-optimized.wasm')

const memory = new WebAssembly.Memory({ initial: 1, maximum: 1 })

const main = async () => {
  const imports = {
    env: {
      __memory_base: 0,
      memory,
      jsHello(someInt) {
        console.log('jsHello called:')
        console.log('  -> someInt', someInt)
      },
      abort(_msg, _file, line, column) {
        console.error("abort called at:" + line + ":" + column)
      }
    }
  }
  
  const wasm = await loader.instantiate(compiledWasm, imports)
  
  // const s = pointer => wasm.exports.__getString(pointer)
  const s = (buffer, ptr) => {
    const len = new Uint32Array(buffer)[ptr + -4 >>> 2] >>> 1
    const arr = new Uint16Array(buffer, ptr, len)
    if (len <= 32) {
      return String.fromCharCode.apply(String, arr)
    }
    return (new TextDecoder('utf-16le')).decode(arr)
  }  

  wasm.exports.main()

  console.log({
    // exports: wasm.exports,
    // strFromWasmToJs: s(wasm.exports.strFromWasmToJs())
    // strFromWasmToJs: wasm.exports.strFromWasmToJs()
    strFromWasmToJs: wasm.exports.strFromWasmToJs(),
    _s_strFromWasmToJs: s(memory.buffer, wasm.exports.strFromWasmToJs()),
    // memory: memory.buffer
  })
}

main()
