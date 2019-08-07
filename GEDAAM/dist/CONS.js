var CONS = {
  
  teste: false,
  
  abaTurmas: "[Turmas]",
  abaMestra: "Mestra",
  abaCertificados: "Certificados",
  
  limparEditores: true,
  deletarAntigas: true,
  usarDados: true,
  prefixo: "G ",
  divisor: ". ",
  encontroIndicador: "E",
  numeroEncontros: 15,
  
  ownerEmail: Session.getEffectiveUser(),
  masterEditors: [
    this.ownerEmail,
    "alairr3@gmail.com",
    "rafawendel2010@gmail.com"
  ],
  
  idModeloCertificados: "1rHzxIKWNwei0vIPj8dBPuXuycuNUWN_HQWVdG_E7aeU", //Hash da URL da Apresentação modelo de certificado
  idPastaCertificados: "1Zueap6QjwvvVBKqgnSRqrSFr3oMcos_i", //Hash da URL da pasta onde a cópia do certificado será estocada
  
  assuntoEmailCertificado: "{{name}}, seu certificado do GEDAAM!",
  corpoEmailCertificado: "{{name}}, \n\n A equipe de Coordenação do GEDAAM se felicita em enviar-lhe seu certificado de {{duration}} relativo ao período {{range}}. \n\n Obrigado por participar!",
  htmlTemplate: "mailTemplate.html",
  
  errors: []
};
