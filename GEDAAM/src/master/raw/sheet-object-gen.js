import JSONDuplicateHandler from './obj-duplicates';

const createObjectFromSheetInput = (
  inputSheet,
  referenceHashObject,
  primerColumn = 'timestamp'
) => {
  const inputObjectsList = [];
  const lastRow = inputSheet
    .getRange(referenceHashObject[primerColumn].range)
    .getValues()
    .filter(row => row[0]).length;

  Object.keys(referenceHashObject).forEach(key => {
    const inputData = inputSheet.getRange(referenceHashObject[key].range).getValues();
    inputData.forEach((row, rowIndex) => {
      if (rowIndex === 0 || rowIndex >= lastRow) return;
      if (!inputObjectsList[rowIndex - 1]) inputObjectsList.push({ [key]: null });
      if (inputData[0].length <= 1) {
        [inputObjectsList[rowIndex - 1][key]] = row;
      } else {
        const objectsList = {};
        row.forEach((cell, colIndex) => {
          if (cell === inputData[0][colIndex]) return;
          objectsList[inputData[0][colIndex]] = cell;
        });
        inputObjectsList[rowIndex - 1][key] = objectsList;
      }
    });
  });

  return JSONDuplicateHandler(inputObjectsList, 'register', 'timestamp');
};

export default createObjectFromSheetInput;
