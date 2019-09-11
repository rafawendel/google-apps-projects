import CONS from '../../config/main';

const sheetDuplicateHandler = (originSheet, destinationSheet, registerCol) => {
  const content = originSheet
    .getRange(2, 1, originSheet.getLastRow() - 1, originSheet.getLastColumn())
    .getValues()
    .filter(row => row[0])
    .sort((a, b) => b[0] - a[0]); // considers second column as order (time stamp)
  const registers = content.map(row => row[registerCol - 1]);
  const filteredContent = content.filter((row, i) => registers.indexOf(row[registerCol - 1]) === i);

  if (CONS.criar.duplicatas) {
    destinationSheet
      .getRange(1, 1, filteredContent.length, originSheet.getLastColumn())
      .setValues(filteredContent);
  }

  return filteredContent;
};

export default sheetDuplicateHandler;
