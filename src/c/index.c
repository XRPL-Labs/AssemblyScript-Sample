#include <stdint.h>

extern void jsHello(int someInt);

const int strFromWasmToJs() {
  return 0;
}

int main() {
  // srand(time(NULL));
  // jsHello(rand());
  jsHello(123123);
  return 0;
}

// // #include <stdio.h>
// // #include <stdlib.h>
// // #include <time.h>

// // TODO: Stuck, either standalone module @ em & can't access eg. time(), rand() as they are then expected in JS env
// //       or not building as standalone but wasi snapshot required on JS end.

// extern "C" {
//   

//   // Todo: string, memory
//   const void strFromWasmToJs() {
//     return;
//   }

//   int main() {
//     // srand(time(NULL));
//     // jsHello(rand());
//     jsHello(123123);
//     return 0;
//   }
// }
