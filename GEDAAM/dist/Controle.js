function copyGroups() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      sheets = ss.getSheets(),
      control = ss.getSheetByName("Controle"),
      cell = control.getRange("A1"),
      gSheets = [],
      lastRow;
  control.clearContents();
  sheets.forEach(function(sheet) {
    if (sheet.getName().indexOf("G ") > -1) { gSheets.push(sheet); }
  })
  gSheets.sort(function(a, b) {
    return a.getName().substr(2) - b.getName().substr(2)
  })
  gSheets.forEach(function(sheet) {
    range = sheet.getDataRange().getValues();
    range[0][0] = sheet.getName() + range[0][0];
    lastRow = cell.getLastRow();
    control.getRange(lastRow,1,range.length,range[0].length).setValues(range);
    cell = control.getRange(lastRow + range.length + 1, 1);
    control.insertRowAfter(lastRow + range.length);
    Logger.log(cell.getValues());
  })
  sheetDesign(control);
}

function sheetDesign(control) {
  control.setColumnWidths(5, 5 + CONS.numeroEncontros, 25);
  control.setColumnWidth(1, 100);
  control.setColumnWidth(2, 200);
  control.setColumnWidth(3, 100);
  control.setColumnWidth(4, 200);
  var cell = control.getRange("T3"),
      formula = "=ROUNDUP((COUNTIF(E3:S3;\"=P\")+COUNTIF(E3:S3;\"=J\")+COUNTIF(E3:S3;\"=FJ\"))/(COUNTIF(E3:S3;\"=A\")+COUNTIF(E3:S3;\"=P\")+COUNTIF(E3:S3;\"=J\")+COUNTIF(E3:S3;\"=FJ\")+COUNTIF(E3:S3;\"=F\"));2)",
      destination = control.getRange(3, 20, control.getLastRow(), 1);
  cell.setFormula(formula);
  cell.copyTo(destination);
}
