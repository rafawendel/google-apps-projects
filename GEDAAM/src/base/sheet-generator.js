import CONS from '../config/main';

const generateTab = name => {
  const ss = CONS.planilha.usarAtiva
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(CONS.planilha.id);

  const destination = ss
    .getSheets()
    .map(sheet => sheet.getName())
    .includes(name)
    ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
    : SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);

  return destination;
};

export default generateTab;
