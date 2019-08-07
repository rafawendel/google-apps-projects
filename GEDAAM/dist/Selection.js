/*Falta tratar:
 - Duplicatas
 - Novos não afetarem antigos
*/

/*
function removeDuplicates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var newData = [];
  for (var i in data) {
    var row = data[i];
    var duplicate = false;
    for (var j in newData) {
      if (row.join() == newData[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      newData.push(row);
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}
*/


function SELECT(opt1, opt2, spotName, spotNumber) {
  var count = {};
  var spots = {};
  var status = "";
  
  var firstOption = opt1[opt1.length-1];
  var secondOption = opt2[opt2.length-1];
  
  // Process spotNumber in map
  for(var i in spotName){
    spots[spotName[i]] = spotNumber[i]; 
  }
  
  // Process 1st option
  for(var i in opt1){
    if(!count[opt1[i]]) count[opt1[i]] = 0;
    if(!count[opt2[i]]) count[opt2[i]] = 0;
    
    if(spots[opt1[i]] > count[opt1[i]]) {
      count[opt1[i]]++; // Approved 1st option
      status = "Aprovado - 1ª opção"; 
    }
    else if(spots[opt2[i]] > count[opt2[i]]) {
      count[opt2[i]]++; // Approved 2nd option      
      status = "Aprovado - 2ª opção"; 
    }
    else {
      count[opt1[i]]++; // Go as an extra on opt1     
      status = (count[opt1[i]]-spots[opt1[i]])+"º excedente";  
    }
    
  }
       
  return status;
  
}