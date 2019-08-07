function doGet(e) {

  var data = {name: "Rafael Wendel", ra: "2016049248"},
      htmlBody = HtmlService.createTemplateFromFile(CONS.htmlTemplate).evaluate().getContent();
  
  Object.keys(data).forEach(function (key) {
    pattern = new RegExp("{{" + key + "}}", "g");
    if (key == "name") { data[key] = data[key].substr(0, data[key].indexOf(" ")) };
    htmlBody = htmlBody.replace(pattern, data[key]);
  });
  
  return HtmlService.createHtmlOutput(htmlBody)
  
}

/*
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Custom Menu')
      .addItem('Show alert', 'showAlert')
      .addToUi();
}
verifiable = [].concat.apply([], verifyCol),
*/

/*
function onEdit(e){
  var sheet = e.source.getActiveSheet();
  dragDown(sheet);
}

function dragDown(sheet) {
  var cell = sheet.getActiveCell();
  var col = cell.getColumn();
  var range = cell.getDataRegion().getLastRow() - 2;
  if (cell.getFormula()) {
    var destination = sheet.getRange(3, col, range, 1);
    cell.copyTo(destination);
    
  }
}
*/
//From: https://stackoverflow.com/questions/154059/how-to-check-empty-undefined-null-string-in-javascript
//For checking if a string is empty, null or undefined I use:

function isEmpty(str) {
    return (!str || 0 === str.length);
}

//For checking if a string is blank, null or undefined I use:

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//For checking if a string is blank or contains only white-space:

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

/*
function checkResponse() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName('Form Responses 1');
  var lastRow = s.getLastRow();
  var range = s.getRange('A' + lastRow + ':C' + lastRow);
  var notes = range.getNotes();
  var values = range.getValues();
  var changedFlag = null;
  var body = '';
 
  for (var i = 0; i < notes[0].length; i++ ) {
    if ( notes[0][i] == 'Responder updated this value.' ) {
      changedFlag = true;
      // We know only to send the changed values
     
      // Add changed value to email msg
      body += values[0][i];
     
      // May also want to clear the note as it remains after future edits of other values as well
      s.getRange(lastRow, i).clearNote();
    }
  }
 
  if ( !changedFlag ) {
    // Email the whole row of values
    for (var i = 0; i < values.length; i++) {
      body += values[0][i];
    }
  }
 
  GmailApp.sendEmail(recipient, subject, body)
}
*/

/*
function findDuplicatesInDifferentSpreadsheets() {
  var ss0=SpreadsheetApp.OpenById("ID0");
  var sh0=ss0.getSheetByName("SheetName0");
  var rg0=sh0.getRange(1,1,sh0.getLastRow(),1);
  var vA0=rg0.getValues();
  var ss1=SpreadsheetApp.openById('ID1');
  var sh1=ss1.getSheetByName("SheetName1");
  var rg1=sh1.getRange(1,2,sh1.getLastRow(),1);
  var vA1=rg1.getValues();
  var dA=[];//duplicate array
  var v0A=vA0.map(function(r){return r[0];});//flatten
  var v1A=vA1.map(function(r){return r[0];});//flatten
  for(var i=0;i<v0A.length;i++) {
    for(var j=0;j<v1A.length;j++) {
      if(v0A[i]==v1A[j]) {
        dA.push(Utilities.formatString('Duplicate Found:<br />SpreadSheet: %s SheetName: %s Row: %s Value: %s<br />SpreadSheet: %s SheetName: %s Row: %s Value: %s',ss0.getName(),sh0.getName(),i+1,v0A[i],ss1.getName(),sh1.getName(),j+1,v1A[j]));
      }
    }
  }
  //Logger.log(dA);                            
  var html=dA.join('<br />');
  var userInterface=HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(userInterface, 'Duplicates');//Results Dialog
}
*/
