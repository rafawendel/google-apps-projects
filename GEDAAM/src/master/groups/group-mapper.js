const groupsMapper = groupsTab => {
  const groupsMap = groupsTab
    .getRange(1, 1, groupsTab.getLastRow(), groupsTab.getLastColumn())
    .getValues()
    .filter(row => row[0])
    .map(row => {
      const filtered = row.filter(cell => cell);
      const [gID, ...rest] = filtered;
      return { id: gID, titles: rest };
    });
  return groupsMap;
};

export default groupsMapper;
