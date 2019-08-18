const CONS = {
  teste: true,

  abaTurmas: '[Turmas]',
  abaMestra: 'Mestra',
  abaCertificados: 'Certificados',

  limparEditores: true,
  deletarAntigas: true,
  usarDados: true,
  prefixo: 'G ',
  divisor: '. ',
  encontroIndicador: 'E',
  numeroEncontros: 15,

  ownerEmail: Session.getEffectiveUser(),
  get masterEditors() {
    return ['alairr3@gmail.com', 'rafawendel2010@gmail.com'].concat(
      this.ownerEmail.toString().split(',')
    );
  },

  certificado: {
    idModelo: '1rHzxIKWNwei0vIPj8dBPuXuycuNUWN_HQWVdG_E7aeU', // Hash da URL da Apresentação modelo de cer'tificado'
    idPasta: '1Zueap6QjwvvVBKqgnSRqrSFr3oMcos_i', // Hash da URL da pasta onde a cópia do certificado será' estocada'
    fazerBackup: false,

    assuntoEmail: '{{name}}, seu certificado do GEDAAM!',
    introEmail: 'Olá {{name}}, tudo bem? Tomara!',
    tituloEmail: 'Temos uma boa notícia!',
    teaserEmail: 'Sim, seu certificado de {{range}} está pronto!',
    corpoEmail:
      '   A equipe de Coordenação do GEDAAM se felicita em enviar-lhe seu certificado de {{duration}} relativo ao período {{range}}. \n\n Obrigado por participar!',
    descricaoEmail: 'Você pode baixá-lo no anexo.',
    htmlTemplate: 'mailTemplate.html'
  }
};

export default CONS;
