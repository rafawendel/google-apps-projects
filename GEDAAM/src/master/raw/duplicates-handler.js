const duplicateHandler = (sheet, registerCol) => {
  const content = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()) // considers second column as order
    .getValues()
    // .filter(row => row[0])
    .sort((a, b) => b[0] - a[0]);
  const registers = content.map(row => row[registerCol - 1]);
  const filteredContent = content.filter((row, i) => registers.indexOf(row[registerCol - 1]) === i);
  return filteredContent;
};

export default duplicateHandler;
