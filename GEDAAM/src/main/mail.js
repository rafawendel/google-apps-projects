// @ts-nocheck
import CONS from './config';

/**
 * @param {object} data {name:string, email:string, sent?:boolean, any:any}
 * @param {blob} attachment
 * @param {string} html
 */
const mailApp = (data, attachment, html) => {
  const log = [];

  if (MailApp.getRemainingDailyQuota() < 1) {
    log.push('\n A cota de emails diária se esgotou \n');

    return [false, log];
  }

  if (!attachment) {
    log.push(`\n O certificado de ${data.name} está ausente \n`);

    return [false, log];
  }

  let pattern = /./;
  let value = '';
  let subject = CONS.certificado.assuntoEmail;
  let body = `${CONS.certificado.introEmail}\n\n${CONS.certificado.corpoEmail}`;
  let htmlBody = html;

  const htmlObj = {
    intro: CONS.certificado.introEmail,
    title: CONS.certificado.tituloEmail,
    body: CONS.certificado.corpoEmail,
    teaser: CONS.certificado.teaserEmail,
    description: CONS.certificado.descricaoEmail,
    preview: `${CONS.certificado.tituloEmail} ${CONS.certificado.teaserEmail}`,
    year: new Date().getFullYear()
  };

  Object.keys(data).forEach(key => {
    pattern = new RegExp(`{{${key}}}`, 'g');
    value = key === 'name' ? data[key].substr(0, data[key].indexOf(' ')) : data[key];
    subject = subject.replace(pattern, value);
    body = body.replace(pattern, value);
    Object.keys(htmlObj).forEach(item => {
      if (htmlObj[item].constructor !== String) {
        return;
      }
      htmlObj[item] = htmlObj[item].replace(pattern, value);
    });
  });

  if (html) {
    htmlBody = Object.keys(htmlObj).reduce(
      (previous, key) => previous.replace(`{{${key}}}`, htmlObj[key]),
      html
    );
  }

  try {
    GmailApp.sendEmail(data.email, subject, body, {
      attachments: [attachment],
      from: 'coordenacaogedaam+ti@gmail.com',
      htmlBody,
      name: 'GEDAAM: Dpto. de TI',
      replyTo: 'coordenacaogedaam+certificados@gmail.com'
    });
    return [true];
  } catch (err) {
    log.push(err.message);
    try {
      MailApp.sendEmail(data.email, subject, body, {
        attachments: [attachment],
        from: 'coordenacaogedaam+ti@gmail.com',
        htmlBody,
        name: 'GEDAAM: Dpto. de TI',
        replyTo: 'coordenacaogedaam+certificados@gmail.com'
      });
      return [true, log];
    } catch (error) {
      log.push(error.message);
      log.push(`\n O e-mail de ${data.email} não foi enviado \n`);

      return [false, log];
    }
  }
};

export default mailApp;
