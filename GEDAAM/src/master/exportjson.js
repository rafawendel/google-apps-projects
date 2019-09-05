const exportObj = (tab, objectList) => {
  let list = [];
  if (objectList instanceof Object) {
    list = objectList.map(obj => obj);
  } else {
    list = objectList;
  }
  list.forEach((obj, i) => {
    tab.getRange(i + 1, 1, 1, 1).setValue(JSON.stringify(obj));
  });
};

export default exportObj;
