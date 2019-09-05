const parseGroupID = (value, groupsMap) => {
  let gID = 0;
  groupsMap.some(obj => {
    if (obj.titles.includes(value)) {
      gID = obj.id;
      return true;
    }
    return false;
  });
  return gID;
};

export default parseGroupID;
