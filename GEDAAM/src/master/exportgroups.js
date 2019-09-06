const exportGroups = (groupsList, tab) => {
  tab.clear();
  tab.appendRow(['Nome', 'Telefone', 'Email']);
  groupsList.forEach(group => {
    const header = [
      `G${group.id} (${group.size.total - group.size.available}/${group.size.total}). 
      ${group.title}`
    ];
    tab.appendRow(header);
    group.members.forEach(member => {
      const row = [member.name, member.phone, member.email];
      tab.appendRow(row);
    });
    tab.appendRow([' ']);
  });
};

export default exportGroups;
