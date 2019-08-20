function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }
  
  function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    for (var i = 0; i < helpText.length; i++) {
      (function() {
         var item = helpText[i];
         document.getElementById(item.id).onfocus = function() {
           showHelp(item.help);
         }
      })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
    }
  }
  
  setupHelp();

  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }
  
  function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    for (var i = 0; i < helpText.length; i++) {
      let item = helpText[i];
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
      }
    }
  }
  
  setupHelp();

  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }
  
  function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    helpText.forEach(function(text) {
      document.getElementById(text.id).onfocus = function() {
        showHelp(text.help);
      }
    });
  }
  
  setupHelp();