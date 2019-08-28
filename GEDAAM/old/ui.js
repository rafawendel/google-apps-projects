/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Criar')
    .addItem('Abas', 'createTabs')
    .addItem('Documentos', 'createDocs')
    .addToUi();
}

function clearIt() {
  var main = 'Respostas ao formulário 1';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  clearTabs(ss, main);
}

function createTabs() {
  var main = 'Respostas ao formulário 1';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(main);
  var currentSheet;
  var range = sheet.getRange(2, 2, sheet.getLastRow() - 1, 12).getValues();
  var head = sheet.getRange(1, 2, 1, 12).getValues();
  var control = [];

  clearTabs(ss, main);

  range.forEach(function(row) {
    if (!row[1]) {
      return;
    }
    if (control.indexOf(row[1]) < 0) {
      ss.insertSheet(row[1]);
      control.push(row[1]);
      currentSheet = ss.getSheetByName(row[1]);
      currentSheet.appendRow(head[0]);
      currentSheet.getRange(1, 1, 1, 12).setFontWeight('bold');
    }
    currentSheet.appendRow(row);
  });
}

function clearTabs(ss, main) {
  var sheets = ss.getSheets();

  sheets.forEach(function(sheet) {
    if (sheet.getName() === main) {
      return;
    }
    //sheet.clear();
    ss.deleteSheet(sheet);
  });
}

function clearIt() {
  var main = 'Respostas ao formulário 1';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  clearTabs(ss, main);
}

function createDocs() {
  var main = 'Respostas ao formulário 1';
  var ui = SpreadsheetApp.getUi();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(main);
  var currentSheet;
  var range = sheet.getRange(2, 3, sheet.getLastRow() - 1, 11).getValues();
  var head = sheet.getRange(1, 3, 1, 11).getValues()[0];
  var control = [];

  var folderName = ui
    .prompt('Insira o nome da pasta onde os arquivos serão adicionados')
    .getResponseText();
  var folder = DriveApp.createFolder(folderName);

  range.forEach(function(row) {
    if (!row[1]) {
      return;
    }
    if (control.indexOf(row[0]) < 0) {
      var resource = {
        title: row[0],
        mimeType: MimeType.GOOGLE_SHEETS,
        parents: [{ id: folder.getId() }]
      };
      var fileJson = Drive.Files.insert(resource);
      var fileId = fileJson.id;
      var newSheet = SpreadsheetApp.openById(fileId);
      currentSheet = newSheet.getActiveSheet();
      currentSheet.setName(row[0]);
      currentSheet.appendRow(head);
      currentSheet.getRange(1, 1, 1, 11).setFontWeight('bold');
      control.push(row[0]);
    }
    currentSheet.appendRow(row);
  });

  ui.alert(
    'Planilhas Geradas',
    'Todas as planilhas foram geradas com sucesso na pasta ' +
      folderName +
      '! \nVerifique o seu Google Drive.',
    ui.ButtonSet.OK
  );
}
