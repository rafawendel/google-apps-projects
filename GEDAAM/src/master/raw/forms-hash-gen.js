import CONS from '../../config/main';
import StudentFormResponse from '../../classes/student-form-response';

const formsDataHashGenerator = (
  controlSheet,
  MotherTemplate = StudentFormResponse,
  ui = SpreadsheetApp.getUi()
) => {
  const objectTemplate = new MotherTemplate();
  const formStructure = Object.keys(objectTemplate);

  if (CONS.atualizar.controleAlunos) {
    let outputData;
    if (
      ui.alert(
        'Aba de referência do formulário',
        'Você deseja recriar a aba?',
        ui.ButtonSet.YES_NO
      ) === ui.Button.YES
    ) {
      controlSheet.clear();
      outputData = [[], [], []];
    } else {
      outputData = controlSheet.getDataRange().getValues();
    }

    try {
      formStructure.forEach(sheetKey => {
        if (outputData[0].includes(sheetKey)) return;
        outputData[0].push(sheetKey);
        outputData[1].push(objectTemplate[sheetKey].range);
        outputData[2].push('Inserir Título(s)');
      });
      controlSheet.getRange(1, 1, outputData.length, outputData[0].length).setValues(outputData);
    } catch (error) {
      ui.alert('Se a aba está em branco, ela deve ser recriada');
    }
  }

  if (
    ui.alert(
      'Aba de referência do formulário',
      'A aba está pronta para ser interpretada?',
      ui.ButtonSet.YES_NO
    ) === ui.Button.NO
  ) {
    // CONS.atualizar.controleAlunos = false;
    ui.alert('Execute novamente quando a aba estiver preparada');
    throw new Error('Aba não está preparada');
  }

  const inputData = controlSheet.getDataRange().getValues();
  inputData.forEach((row, rowIndex) => {
    if (rowIndex === 0) return;
    row.forEach((cell, colIndex) => {
      if (!cell) return;
      if (!inputData[0][colIndex] || !inputData[1][colIndex]) return;
      if (rowIndex === 1) {
        objectTemplate[inputData[0][colIndex]].range = cell;
      } else {
        objectTemplate[inputData[0][colIndex]].aliases.push(cell);
      }
    });
  });

  return objectTemplate;
};

export default formsDataHashGenerator;
