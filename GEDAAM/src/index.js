
function myFunction() {
  Logger.log('Olá caralho!');
}

// @ts-ignore
global.myFunction = myFunction;
