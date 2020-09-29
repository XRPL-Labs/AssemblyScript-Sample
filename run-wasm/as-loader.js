const fs = require("fs")
const loader = require("@assemblyscript/loader")

const compiledWasm = fs.readFileSync(__dirname + "/../build/optimized.wasm")

const main = async () => {
  const imports = {
    env: {
      jsHello(someInt) {
        console.log('someInt', someInt)
      },
      abort(_msg, _file, line, column) {
        console.error("abort called at main.ts:" + line + ":" + column)
      }
    }
  }
  
  const wasmModule = await loader.instantiate(compiledWasm, imports)
}

main()
