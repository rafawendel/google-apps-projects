const generateTab = name => {
  let destiny = {};
  let existed = false;
  if (
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheets()
      .map(sheet => sheet.getName())
      .includes(name)
  ) {
    destiny = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    existed = true;
  } else {
    destiny = SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);
  }
  return { sheet: destiny, status: existed };
};

export default generateTab;
