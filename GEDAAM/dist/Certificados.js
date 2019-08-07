// Para o funcionamento adequado desta função, a primeira linha da aba geradora de certificados deve conter:
//    student_id	name	university	role	range	duration	course	email	sent?
// A ordem é arbitrária, bem como o título das colunas, no entanto, "name" e "email" devem manter esse valor e "sent?" deve estar na posição 9
// Os títulos das colunas devem corresponder aos valores no arquivo Google Presentation "Template"
// Os títulos das colunas devem corresponder aos valores no modelo "mailTemplate.html"
// O padrão de substituição deve estar entre marcadores "{{ padrão }}"

var ERRORS = [];

function certificateSheet() {
  
  try {
    
    var i, entry, mail;
    
    var data = {},
        verification = [],
        ss = SpreadsheetApp.openById("1A1QrlGetRpPO_RDYKDaaM1KJiujWDt51O6nffjwuEDk").getSheetByName(CONS.abaCertificados),
        keys = ss.getRange(1, 1, 1, 8).getValues()[0],
        range = ss.getRange(2, 1, ss.getLastRow() - 1, 8).getValues(),
        verifyRange = ss.getRange(2, 9, ss.getLastRow() - 1, 1),
        verifyCol = verifyRange.getValues(),
        html = HtmlService.createTemplateFromFile(CONS.htmlTemplate).evaluate().getContent();
    
    for (i = 0; i < range.length ; i++) {
      if (verifyCol[i][0]) { continue }
      range[i].forEach(function(key, index) {
        data[keys[index]] = key.toString().trim();
        if (CONS.teste) { data.email = CONS.ownerEmail }
      })
      
      mail = mailApp(data, generateCertificate(data), html);
      if (!mail) { ERRORS.push("\n Houve um erro ao enviar o certificado de " + data.name + "\n") }
      verifyCol[i] = [mail];
      
    }
    
  } catch (err) { 
    
    ERRORS.push(err.message) 
    
  } finally {
    
    verifyRange.setValues(verifyCol);
    SpreadsheetApp.flush();
    
    ERRORS = ERRORS[0] ? ERRORS.toString() : "Todos os certificados foram gerados com sucesso"
    SpreadsheetApp.getUi().alert(ERRORS);
    Logger.log(ERRORS);
    
  }
  
}

function generateCertificate(data) {
  
  try {
    
    var templateId = CONS.idModeloCertificados,
        targetFolderId = CONS.idPastaCertificados,
        targetFile = DriveApp.getFileById(templateId).makeCopy("Certificado de " + data.name + ".pdf"),
        targetDocument = SlidesApp.openById(targetFile.getId()),
        targetSlide = targetDocument.getSlides()[0];
    
    Object.keys(data).forEach(function (key) {
      targetSlide.replaceAllText(("{{" + key + "}}"), data[key]);
    });
    
    targetDocument.saveAndClose();
    
    var blob = targetFile.getAs("application/pdf").copyBlob(),  
        backupFile = DriveApp.getFolderById(targetFolderId).createFile(blob);
    
    targetFile.setTrashed(true);
    if (CONS.teste) { backupFile.setTrashed(true) }
    
  } catch(err) { 
    
    ERRORS.push(err.message);
    ERRORS.push("\n O certificado de " + data.name + " não pôde ser gerado \n");
    
    return false
    
  }
  
  return blob
  
}

function mailApp(data, attachment, html) {
  
  if (MailApp.getRemainingDailyQuota() < 1) {
    ERRORS.push("\n A cota de emails diária se esgotou \n");
    throw new Error("A cota de emails diária se esgotou");
    
    return false
    
  }
  
  if (!attachment) { 
    
    ERRORS.push("\n O certificado de " + data.name + " está ausente \n");
    
    return false
    
  } else {
    
    var pattern,
        subject = CONS.assuntoEmailCertificado,
        body = CONS.corpoEmailCertificado,
        htmlBody = html;
        //imageBlob = DriveApp.getFileById("0Bx4vy5p9TA6bekY3Q2ZNdzViVkE").getBlob().setName("imageBlob");
    
    Object.keys(data).forEach(function (key) {
      pattern = new RegExp("{{" + key + "}}", "g");
      if (key == "name") { data[key] = data[key].substr(0, data[key].indexOf(" ")) };
      subject = subject.replace(pattern, data[key]);
      body = body.replace(pattern, data[key]);
      //htmlBody = htmlBody.replace(pattern, data[key]);
    });
    
    try {
      
      GmailApp.sendEmail(data.email, subject, body, {
        attachments: [attachment],
        from: "coordenacaogedaam+ti@gmail.com",
        //htmlBody: htmlBody,
        //inlineImages: {imageKey: imageBlob},
        name: "GEDAAM: Dpto. de TI",
        replyTo: "coordenacaogedaam+certificados@gmail.com"
      });
      
    }  catch(err) { 
      
      ERRORS.push(err.message);
      ERRORS.push("\n O e-mail de " + data.email + " não foi enviado \n");
      
      return "ERRO EMAIL"
      
    }
    
  }
  
  return true
  
}
