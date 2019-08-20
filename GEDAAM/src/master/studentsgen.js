class Key {
    constructor() {

    }
}

var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
  })();
  
  add();
  add();
  add();
  
  // the counter is now 3 

  function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  
  console.log(add5(2));  // 7
  console.log(add10(2)); // 12

class Student {
    constructor() {
        this.key = new Key();
    }
}