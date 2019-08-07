// Deve-se, antes de executar esta função, alterar o arquivo de modo que todos com o link possam editar.

function setSharingPermissions() {
  var i, j, turma, splitEmails, gId, protection, emails;
  var sApp = SpreadsheetApp.getActive();
  var sheets = sApp.getSheets();
  
  var clearEditors = CONS.limparEditores,
      classTab = CONS.abaTurmas,
      prefix = CONS.prefixo,
      masterEditors = CONS.masterEditors;
  
  var groupEditors = [],
      groupEditorsList = [],
      gnumbers = [],
      gg = [];
  
  var coordenadores = sApp.getSheetByName(classTab),
      dataCoordenadores = coordenadores.getDataRange().getValues();

  for (i = 1; i <= dataCoordenadores[0].length; i++) {
    gnumbers.push(dataCoordenadores[i][0]);
    splitEmails = dataCoordenadores[i][15].split(", ");
    groupEditors.push(splitEmails);
    groupEditorsList.concat(splitEmails);
    /*
    for (j = 0; j < splitEmails.length; j++) {
      //if (splitEmails[j] === undefined || splitEmails[j] == "") { continue; }
      if (!splitEmails[j]) continue
      groupEditorsList.push(splitEmails[j]);
    }*/
  }
  
  function Turma(id, emails) {
    this.id = id;
    this.emails = emails;
  }
  
  for (i = 0; i < gnumbers.length; i++) {
    turma = new Turma(gnumbers[i], groupEditors[i]);
    gg.push(turma);
  }
  
  for (i = 0; i < sheets.length; i++) {
    protection = sheets[i].protect().setDescription("Esta aba só pode ser alterada pelos admnistradores");
    if (clearEditors) { protection.removeEditors(groupEditorsList); }
    protection.addEditors(masterEditors);
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }
    
   if (sheets[i].getName().search(prefix) == 0) { 
     gId = + sheets[i].getName().slice(2);
     protection = sheets[i].protect().setDescription("Esta aba só pode ser alterada pelos coordenadores da turma, se você é um deles, procure o admnistrador");
     for (j = 0; j < gg.length; j++){
       if (gg[j].id != gId) { continue; }
       emails = gg[j].emails;
       if (!emails) { continue; }
       try{
         protection.addEditors(emails);
       }
       catch(err) { Logger.log(err); }
     }
   }
  }
}
