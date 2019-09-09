const CONS = {
  teste: true,

  abas: {
    forms: 'Formulário',
    controleAlunos: 'Students',
    turmas: 'Turmas',
    controleTurmas: 'Groups',
    mestra: 'Mestra',
    certificados: 'Certificados',
    bonus: 'Bonus',
    duplicatas: 'Sem Duplicatas'
  },

  criar: {
    duplicatas: true,
    jsons: true
  },

  atualizar: {
    controleAlunos: false
  },

  email: {
    nome: 'GEDAAM: Dpto. de TI',
    placeholder: '|_|',
    admnistrador: 'rafawendel2010@gmail.com',
    mestre: 'coordenacaogedaam@gmail.com',
    origem: 'coordenacaogedaam+ti@gmail.com',
    responderPara: 'coordenacaogedaam+|_|@gmail.com',
    proprietario: Session.getEffectiveUser(),
    get editores() {
      return ['rafawendel2010@gmail.com'].concat(this.ownerEmail.toString().split(','));
    }
  },

  certificado: {
    idModelo: '1rHzxIKWNwei0vIPj8dBPuXuycuNUWN_HQWVdG_E7aeU', // Hash da URL da Apresentação modelo de cer'tificado'
    idPasta: '1Zueap6QjwvvVBKqgnSRqrSFr3oMcos_i', // Hash da URL da pasta onde a cópia do certificado será estocada
    fazerBackup: false,

    assuntoEmail: '{{name}}, seu certificado do GEDAAM!',
    introEmail: 'Olá {{name}}, tudo bem? Tomara!',
    tituloEmail: 'Temos uma boa notícia!',
    teaserEmail: 'Sim, seu certificado de {{range}} está pronto!',
    corpoEmail:
      '   A equipe de Coordenação do GEDAAM se felicita em enviar-lhe seu certificado de {{duration}} relativo ao período {{range}}. \n\n Obrigado por participar!',
    descricaoEmail: 'Você pode baixá-lo no anexo.',
    htmlTemplate: 'mailtemplate.html'
  }
};

export default CONS;
