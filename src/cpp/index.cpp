#include <emscripten.h>
// #include <stdio.h>
// #include <stdlib.h>
// #include <time.h>

extern "C" {
  extern void jsHello(int someInt);

  // Todo: string, memory
  const void strFromWasmToJs() {
    return;
  }

  int main() {
    // srand(time(NULL));
    // jsHello(rand());
    jsHello(123123);
    return 0;
  }
}
