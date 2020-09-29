import {someFn, anotherFn} from './someMacroLikeLib'

@external("env", "jsHello")
declare function jsHello(message?: i32): void

export function main(): void {
  const someArray = [someFn(), anotherFn()]
  jsHello(someArray[i32(Math.random() > 0.5)])
}

main()
