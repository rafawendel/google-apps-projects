/*
This is not the final version for this module, but a workaround 
to make it run without re-generating the JSON list.
*/

/* This is a snippet that should work if there were a group for waitlisted students
  if (student.status.waitlist) {
    placeholders.body = `Infelizmente as vagas na turma {{choice}} acabaram! Você foi colocada na lista de espera. \n
                          Enquanto isso, fique atento ao Instagram do GEDAAM, haverá edital de vagas remanescentes!`;
    placeholders.description = 'Entraremos em contato tão logo uma vaga seja disponibilizada!';
  } else {
    placeholders.body = 'A sua inscrição na turma {{choice}} foi confirmada! Parabéns!';
    placeholders.description = 'Em breve seu coordenador entrará em contato. Aguarde!';
  }
*/

import mailApp from '../mail/mail';

const sendConfirmationEmail = () => {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('JSON Final');
  const log = [];

  const dataRange = ss
    .getDataRange()
    .getValues()
    .map(row => JSON.parse(row[0]));

  const html = HtmlService.createTemplateFromFile('mailtemplate.html')
    .evaluate()
    .getContent()
    .toString();

  const placeholders = {
    subject: '{{name}}, sua inscrição no GEDAAM já foi processada!',
    intro: 'Olá {{name}}, tudo bem?',
    title: 'Trazemos notícias sobre sua inscrição',
    body: 'A sua inscrição na turma {{choice}} foi confirmada! Parabéns!',
    teaser: 'Viemos contar sobre sua inscrição no GEDAAM',
    description: 'Em breve seu coordenador entrará em contato. Aguarde!',
    year: new Date().getFullYear(),
    replyTo: 'inscricoes'
  };

  // dataRange.forEach(group => {
  const group = dataRange[0];
  group.members.forEach(student => {
    const data = {
      choice: group.title,
      name: student.name,
      email: student.email
    };

    const mail = mailApp(data, html, placeholders);
    if (!mail[0]) log.push(mail[1]);
  });
  // });

  SpreadsheetApp.getUi().alert(String(log));
};

export default sendConfirmationEmail;
