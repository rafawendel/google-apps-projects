import CONS from '../../config/main';
import mailAppGAS from '../../mail/mail-gas';
import getJSONFromTab from '../imports/get-json';

const sendConfirmationEmail = (groupsJSONTab, log = []) => {
  const placeholders = {
    subject: CONS.confirmacao.assuntoEmail,
    intro: CONS.confirmacao.introEmail,
    title: CONS.confirmacao.tituloEmail,
    body: CONS.confirmacao.corpoEmail,
    teaser: CONS.confirmacao.teaserEmail,
    description: CONS.confirmacao.descricaoEmail,
    year: new Date().getFullYear(),
    replyTo: 'inscricoes'
  };

  const groupsJSONList = getJSONFromTab(groupsJSONTab);
  groupsJSONList.forEach(group => {
    group.members.forEach(student => {
      const data = {
        choice: group.title,
        name: student.name,
        email: student.email
      };

      const mail = mailAppGAS(data, placeholders, true);
      if (!mail[0]) log.push(mail[1]);
    });
  });

  return log;
};

export default sendConfirmationEmail;

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
