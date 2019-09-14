const getJSONFromTab = tab => {
  return tab
    .getDataRange()
    .getValues()
    .map(row => JSON.parse(row[0]));
};

export default getJSONFromTab;
