#include <emscripten.h>
// #include <stdio.h>
// #include <stdlib.h>
// #include <time.h>

// TODO: Stuck, either standalone module @ em & can't access eg. time(), rand() as they are then expected in JS env
//       or not building as standalone but wasi snapshot required on JS end.

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
