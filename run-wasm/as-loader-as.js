const fs = require("fs")
const loader = require("@assemblyscript/loader")

const compiledWasm = fs.readFileSync(__dirname + "/../build/as-optimized.wasm")

const main = async () => {
  const imports = {
    env: {
      jsHello(someInt) {
        console.log('someInt', someInt)
      },
      abort(_msg, _file, line, column) {
        console.error("abort called at:" + line + ":" + column)
      }
    }
  }
  
  const wasm = await loader.instantiate(compiledWasm, imports)
  const s = pointer => wasm.exports.__getString(pointer)

  console.log({
    strFromWasmToJs: s(wasm.exports.strFromWasmToJs())
  })
}

main()
