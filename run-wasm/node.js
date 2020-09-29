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

const main = async () => {
  try {
    const compiledWasm = new Uint8Array(fs.readFileSync(__dirname + '/../build/optimized.wasm'))
    const wasm = await WebAssembly.instantiate(compiledWasm, imports)
  } catch (e) {
    console.error(e)
  }
}

main()
