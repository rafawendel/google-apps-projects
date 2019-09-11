import CONS from '../config/main';

/**
 * @param {object} data {name:string, email:string, sent?:boolean, any:any}
 * @return {array} [blob] or [false, errorLog]
 */
const generateCertificate = data => {
  const log = [];
  try {
    const templateId = CONS.certificado.idModelo;
    const targetFile = DriveApp.getFileById(templateId).makeCopy(`Certificado de ${data.name}.pdf`);
    const targetDocument = SlidesApp.openById(targetFile.getId());
    const targetSlide = targetDocument.getSlides()[0];

    Object.keys(data).forEach(key => {
      targetSlide.replaceAllText(`{{${key}}}`, data[key]);
    });

    targetDocument.saveAndClose();

    const blob = targetFile.getAs('application/pdf').copyBlob();

    if (CONS.certificado.fazerBackup) {
      const targetFolder = DriveApp.getFolderById(CONS.certificado.idPasta);
      const oldFiles = targetFolder.getFilesByName(targetFile.getName());
      while (oldFiles.hasNext()) {
        const trashFile = oldFiles.next();
        trashFile.setTrashed(true);
      }
      if (!CONS.teste) {
        targetFolder.createFile(blob);
      }
    }

    targetFile.setTrashed(true);

    return [blob];
  } catch (err) {
    log.push(err.message);
    log.push(`\n O certificado de ${data.name} não pôde ser gerado \n`);

    return [false, log];
  }
};

export default generateCertificate;
