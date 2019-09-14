import Group from '../../classes/group';

const groupsGenerator = (groupsControlTab, groupsMap, startKey = 1) => {
  const groupsArray = [];

  const groupsControlMap = groupsControlTab
    .getRange(1, 1, groupsControlTab.getLastRow(), groupsControlTab.getLastColumn())
    .getValues()
    .filter(row => row[0]);

  const [[, ...keys], ...rest] = groupsControlMap;
  const groupsControlObject = {};
  rest.forEach(row => {
    groupsControlObject[row[0]] = {};
    keys.forEach((key, i) => {
      if (!key) return;
      groupsControlObject[row[0]][key] = row[i + 1];
    });
  });

  groupsMap.forEach((item, i) => {
    // eslint-disable-next-line eqeqeq
    if (item.id == 0) return;
    const [mainTitle, ...otherTitles] = item.titles;
    const group = new Group({
      primaryKey: startKey + i,
      id: +item.id,
      title: mainTitle,
      aliases: otherTitles,
      schedule: groupsControlObject[item.id].schedule,
      campus: groupsControlObject[item.id].campus,
      size: { total: groupsControlObject[item.id].size }
    });
    groupsArray.push(group);
  });

  return groupsArray;
};

export default groupsGenerator;
