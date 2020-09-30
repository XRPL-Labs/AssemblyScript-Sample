import {someFn, anotherFn} from './someMacroLikeLib'

@external("env", "jsHello")
declare function jsHello(message?: i32): void

// Note: by using strings helper functions will be compiled into the .wasm (~400Bytes » 1KB)
export function strFromWasmToJs(): string {
  return 'Hi there, this is AssemblyScript Wasm speaking!'
}

export function main(): void {
  const someArray = [someFn(), anotherFn()]
  jsHello(someArray[i32(Math.random() > 0.5)])
}
