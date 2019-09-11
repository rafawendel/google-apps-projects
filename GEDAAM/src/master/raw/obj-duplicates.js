const JSONDuplicateHandler = (objectList, registerKey, orderKey) => {
  objectList.sort((a, b) => b[orderKey] - a[orderKey]); // if the data is not pre-sorted. move to main fuction?
  const registers = objectList.map(obj => obj[registerKey]);
  const filteredOjectList = objectList.filter(
    (obj, i) => registers.indexOf(obj[registerKey]) === i
  );
  return filteredOjectList;
};

export default JSONDuplicateHandler;
