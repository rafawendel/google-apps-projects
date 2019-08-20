/**
 *A primeira linha da aba geradora de certificados deve conter os dados que serão usados como placeholders
 *A ordem é arbitrária, desde que "name" e "email" tenham esse valor e "sent?" esteja na posição 9
 *Os títulos das colunas devem corresponder aos valores no arquivo Google Presentation "Template"
 *O padrão de substituição deve estar entre marcadores "{{ padrão }}"
 */

import CONS from '../main/config';
import mailApp from '../main/mail';
import generateCertificate from './certificates';

const certificateSheet = () => {
  let log = [];

  const ss = SpreadsheetApp.openById('1A1QrlGetRpPO_RDYKDaaM1KJiujWDt51O6nffjwuEDk').getSheetByName(
    CONS.abaCertificados
  );
  const verifyRange = ss.getRange(2, 9, ss.getLastRow() - 1, 1);
  const verifyCol = verifyRange.getValues();

  try {
    let mail = [];
    let certificate = [null];
    const data = {};
    const keys = ss.getRange(1, 1, 1, 8).getValues()[0];
    const range = ss.getRange(2, 1, ss.getLastRow() - 1, 8).getValues();
    const html = HtmlService.createTemplateFromFile(CONS.certificado.htmlTemplate)
      .evaluate()
      .getContent()
      .toString();

    range.forEach((entry, i) => {
      if (verifyCol[i][0]) {
        return;
      }
      entry.forEach((key, index) => {
        if (CONS.teste && keys[index] === 'email') {
          data[keys[index]] = CONS.ownerEmail;
        } else {
          data[keys[index]] = key.toString().trim();
        }
      });
      certificate = generateCertificate(data);
      mail = mailApp(data, certificate[0], html);
      log.concat(mail[1], certificate[1]);
      if (!mail[0]) {
        log.push(`\n Houve um erro ao enviar o certificado de ${data.name}\n`);
      }
      verifyCol[i] = [mail[0]];
      verifyRange.setValues(verifyCol);
    });
  } catch (err) {
    log.push(err.message);
  } finally {
    SpreadsheetApp.flush();
    log = [log[0] ? log.toString() : 'Todos os certificados foram gerados com sucesso'];
    SpreadsheetApp.getUi().alert(log.toString());
    Logger.log(log);
  }
};

// @ts-ignore
global.generateCertificate = generateCertificate;
// @ts-ignore
global.mailApp = mailApp;
export default certificateSheet;
