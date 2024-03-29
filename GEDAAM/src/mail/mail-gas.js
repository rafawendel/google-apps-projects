/*
Use the following code in order to save HTML from presentation:
https://developers.google.com/drive/api/v3/reference/files/export
var file = DriveApp.getFileById('1234567890abcdefghijklmnopqrstuvwxyz');
var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
MailApp.sendEmail('mike@example.com', 'Attachment example', 'Two files are attached.', {
    name: 'Automatic Emailer Script',
    attachments: [file.getAs(MimeType.PDF), blob]
});
*/
import CONS from '../config/main';

const mailAppGAS = (data, placeholders, useHtml = true, attachment = null) => {
  const log = [];
  let pattern = /./;
  let replacingValue = '';
  const email = CONS.teste ? CONS.email.admnistrador : data.email;

  if (MailApp.getRemainingDailyQuota() < 1) {
    log.push('A cota de emails diária se esgotou \n');
    return [false, log];
  }

  let { subject } = placeholders;
  let body = `${placeholders.intro}\n\n${placeholders.body}`;
  const replacedPlaceholders = { ...placeholders };

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Object) return;
    pattern = new RegExp(`{{${key}}}`, 'g');

    replacingValue = key === 'name' ? data[key].substr(0, data[key].indexOf(' ')) : data[key];
    subject = subject.replace(pattern, replacingValue);
    body = body.replace(pattern, replacingValue);

    Object.keys(placeholders).forEach(item => {
      if (placeholders[item].constructor !== String) return;
      replacedPlaceholders[item] = replacedPlaceholders[item].replace(pattern, replacingValue);
    });
  });

  // These placeholders depend on the template downloaded from MailChimp
  const mailChimp = {};
  mailChimp.MC_PREVIEW_TEXT = `${replacedPlaceholders.title}. ${replacedPlaceholders.teaser}`;
  mailChimp['MC:SUBJECT'] = replacedPlaceholders.subject;

  let htmlBody = null;
  if (useHtml) {
    htmlBody = HtmlService.createTemplateFromFile(CONS.email.htmlTemplate)
      .evaluate()
      .getContent()
      .toString();

    htmlBody = Object.keys(replacedPlaceholders).reduce((previous, key) => {
      return previous.replace(`{{${key}}}`, replacedPlaceholders[key]);
    }, htmlBody);
    htmlBody = Object.keys(mailChimp).reduce(
      (previous, key) => previous.replace(`*|${key}|*`, mailChimp[key]),
      htmlBody
    );
  }

  const options = {
    attachments: [attachment],
    from: CONS.email.origem,
    htmlBody: htmlBody || null,
    name: CONS.email.nome,
    replyTo: CONS.email.responderPara.replace(CONS.email.placeholder, replacedPlaceholders.replyTo)
  };
  if (!attachment) delete options.attachments;

  try {
    GmailApp.sendEmail(email, subject, body, options);
    return [true];
  } catch (err) {
    try {
      MailApp.sendEmail(email, subject, body, options);
      return [true];
    } catch (error) {
      log.push(error.message);
      log.push(`O e-mail de ${data.name} não foi enviado \n`);

      return [false, log];
    }
  }
};

export default mailAppGAS;
