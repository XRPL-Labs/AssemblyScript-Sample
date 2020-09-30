const fs = require('fs')
const crypto = require('crypto')

const memory = new WebAssembly.Memory({ initial: 1, maximum: 1 })

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
    },
    // Required to use Math.random (?)
    seed () {
      return crypto.randomBytes(128).readUInt32BE() + Date.now()
    }
  }
}

const s = (buffer, ptr) => {
  const len = new Uint32Array(buffer)[ptr + -4 >>> 2] >>> 1
  const arr = new Uint16Array(buffer, ptr, len)
  if (len <= 32) {
    return String.fromCharCode.apply(String, arr)
  }
  return (new TextDecoder('utf-16le')).decode(arr)
}  

const main = async () => {
  try {
    const compiledWasm = new Uint8Array(fs.readFileSync(__dirname + '/../build/' + process.argv[2] + '-optimized.wasm'))
    const wasm = await WebAssembly.instantiate(compiledWasm, imports)

    wasm.instance.exports.main()

    console.log({
      // exports: wasm.instance.exports,
      strFromWasmToJs: wasm.instance.exports.strFromWasmToJs(),
      _s_strFromWasmToJs: s(memory.buffer, wasm.instance.exports.strFromWasmToJs())
    })
  } catch (e) {
    console.error(e)
  }
}

main()
