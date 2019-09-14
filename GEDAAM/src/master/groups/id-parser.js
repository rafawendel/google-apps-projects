const parseGroupID = (value, groupsArray) => {
  let gID = 0;
  groupsArray.some(obj => {
    const [...titles] = obj.aliases;
    titles.push(obj.title);
    Logger.log(titles);
    if (titles.includes(value)) {
      gID = obj.id;
      return true;
    }
    return false;
  });
  return gID;
};

export default parseGroupID;
