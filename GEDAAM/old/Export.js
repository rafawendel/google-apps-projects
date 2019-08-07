//Esta função depende que os registros sejam feitos da seguinte forma:
//RA	Nome	Telefone	E-mail
//O registro acadêmico deve ser um número!

function Main() {
  var errors = [];
  exportSheets();
  setSharingPermissions();
  Logger.log(errors);
  Utilities.sleep(200);
}

function exportSheets() {
  var i, j, k, aluno, turma, title, gnumber, sheetName, oldSheet, currentData, sheet, sheets, range;
  var masterTab = CONS.abaMestra,
      classTab = CONS.abaTurmas,
      prefix = CONS.prefixo,
      splitter = CONS.divisor,
      deleteOld = CONS.deletarAntigas,
      useOldData = CONS.usarDados,
      plannedMeetings = CONS.numeroEncontros;
  
  var sheetNames = [],
      turmas = [],
      alunos = [],
      turmAlunos = [],
      thisTurma = [],
      hasOld = [];
  
  var sApp = SpreadsheetApp.getActiveSpreadsheet();
  var masterSheet = sApp.getSheetByName(masterTab);
  var data = masterSheet.getDataRange().getValues();
  var coordenadores = sApp.getSheetByName(classTab);
  var dataCoordenadores = coordenadores.getDataRange().getValues();
  
  function Aluno(ra, nome, tel, email, index) {
    this.register = ra;
    this.name = nome;
    this.tel = tel;
    this.email = email;
    this.gnumber = index;
  }
  
  function Turma(gnumber, title, content) {
    this.gnumber = gnumber; //id
    this.title = title;
    this.content = content;
    //beginning date
    //
  }
  
  for (i = 1; i < data.length; i++) {
    //if (data[i][0] === undefined || data[i][0] == "" || data[i][0] == null) { continue; }
    if (!data[i][0]) continue
    if (data[i][0].constructor === String) {
      title = data[i][0];
      gnumber = + title.slice(0, title.indexOf(splitter));
      title = title.substring(title.indexOf(splitter) + 1);
      turma = new Turma(gnumber, title, []);
      turmas.push(turma);
    } else {
      aluno = new Aluno(data[i][0], data[i][1], data[i][2], data[i][3], gnumber);
      alunos.push(aluno);
    }
  }
  
  for (i = 0; i < turmas.length; i++) {
    for (j = 0; j < alunos.length; j++) {
      if (alunos[j].gnumber != turmas[i].gnumber) { continue; }
      turmAlunos.push(alunos[j]);
    }
    turmas[i].content = turmAlunos;
    turmAlunos = [];
  }
  
  for(i = 0; i < turmas.length; i++){
    sheetName = prefix + turmas[i].gnumber;
    sheets = sApp.getSheets();
    for (j = 0; j < sheets.length; j++) {
      sheetNames.push(sheets[j].getName());
      if (sheets[j].getName() != sheetName) { continue; }
      hasOld.push(turmas[i].gnumber);
      currentData = sheets[j].getDataRange().getValues();
      oldSheet = new Turma(turmas[i].gnumber, turmas[i].title, currentData);
      if (deleteOld) {
        sApp.deleteSheet(sheets[j]);
        sApp.insertSheet(sheetName);
      }
    }
    if (sheetNames.indexOf(sheetName) == -1) { sApp.insertSheet(sheetName); }
    
    sheet = sApp.getSheetByName(sheetName);
    sheet.activate();
    try{
      if (useOldData && hasOld.indexOf(turmas[i].gnumber) > -1) {
        if (oldSheet.gnumber == turmas[i].gnumber) {
          range = sheet.getRange(1, 1, oldSheet.content.length, 4 + plannedMeetings);
          range.setValues(oldSheet.content);
        }
      } else {
        thisTurma = [];
        for (k = 0; k < turmas[i].content.length; k++) {
          thisTurma.push([
            turmas[i].content[k].register,
            turmas[i].content[k].name,
            turmas[i].content[k].tel,
            turmas[i].content[k].email
          ]);
        }
        range = sheet.getRange(3, 1, turmas[i].content.length, 4);
        range.setValues(thisTurma);
      }
    }
    catch(err) { errors.push(err); }
    //sheetDesign(sheet, turmas[i].title, turmas[i].content.length);
    sheet.sheetDesign(turmas[i].title, turmas[i].content.length);
    //sheet protect?
  }
}

function sheetDesign(sheet, title, verticalSize, beginningDate) {
  var meetingPrefix = CONS.encontroIndicador,
      plannedMeetings = CONS.numeroEncontros,
      header = [['RA', 'Nome', 'Telefone', 'Email']],
      i = 1;
  
  while (i < plannedMeetings + 1) {
    header[0].push(meetingPrefix + i);
    //somar datas
    i++;
  }
  // incluir função que soma as presenças, incluir datas
  
  var object = sheet.getRange("A1");
  object.setValue(title);
  object.setFontColor("#0B8043");
  object.setFontSize(11);
  object.setFontWeight("bold");
  //mudar tipo de valor da função que soma para porcentagem
  
  object = sheet.getRange(2, 1, 1, 4 + plannedMeetings);
  object.setValues(header);
  object.setFontWeight("bold");
  
  sheet.setColumnWidths(5, 5 + plannedMeetings, 25);
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 200);
  
  object = sheet.getRange(2, 5, verticalSize, plannedMeetings);
  object.setFontSize(9);
  object.setHorizontalAlignment("center");
  object.setVerticalAlignment("middle");
  //incluir formatacâo condicional para adimplencia
  //incluir notas de instrução
  //incluir campos para preenchimento de informação chave
  //tratar mudanças de turma
  //tratar dropouts e ingressos tardios
}
