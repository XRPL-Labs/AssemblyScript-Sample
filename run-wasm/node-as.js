const fs = require('fs')
const crypto = require('crypto')

const imports = {
  env: {
    jsHello(someInt) {
      console.log('someInt', someInt)
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
  return (new TextEncoder('utf-8')).decode(arr)
}

const main = async () => {
  try {
    const compiledWasm = new Uint8Array(fs.readFileSync(__dirname + '/../build/as-optimized.wasm'))
    const wasm = await WebAssembly.instantiate(compiledWasm, imports)

    console.log({
      strFromWasmToJs: s(wasm.instance.exports.memory.buffer, wasm.instance.exports.strFromWasmToJs())
    })
  } catch (e) {
    console.error(e)
  }
}

main()
