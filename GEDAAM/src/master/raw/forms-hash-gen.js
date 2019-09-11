import StudentFormResponse from '../../classes/student-form-response';

/**
 * @param { Object } controlTab { Sheet } object
 * @param { Boolean } update
 * @param {{ timestamp?: any[]; name?: any[]; gender?: any[]; register?: any[]; email?: any[]; phone?: any[]; course?: any[]; semester?: any[]; university?: any[]; declaredNewbie?: any[]; opt1?: any[]; opt2?: any[]; firstContactMedium?: any[]; performanceSummary?: any[]; feedbackSummary?: any[]; availabilitySummary?: any[]; sheetKey?: any; }} objectTemplate
 */
const formsDataHashGenerator = (controlTab, update, objectTemplate = new StudentFormResponse()) => {
  let range = {};
  let values = [];
  const formStructure = Object.keys(objectTemplate);

  if (update) {
    range = controlTab.getRange(1, 1, 2, formStructure.length);
    values = [[], []];
    formStructure.forEach(sheetKey => {
      values[0].push(sheetKey);
      values[1].push(objectTemplate[sheetKey][0]);
    });
  } else {
    range = controlTab.getDataRange();
    values = range.getValues();
    values.forEach((row, i) => {
      if (!i) return;
      row.forEach((cell, col) => {
        if (!cell) return;
        objectTemplate[values[0][col]].push(cell);
      });
    });
  }

  range.setValues(values);
  return objectTemplate;
};

export default formsDataHashGenerator;
