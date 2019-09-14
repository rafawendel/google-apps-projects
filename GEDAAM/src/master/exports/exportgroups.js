const exportGroups = (tab, groupsList, studentObjectsList) => {
  const studenstRegisterList = studentObjectsList.map(student => student.register);
  tab.clear();
  tab.appendRow(['Nome', 'Telefone', 'Email']);
  groupsList.forEach(group => {
    const header = [
      `G${group.id} (${group.size.total - group.size.available}/${group.size.total}). 
      ${group.title}`
    ];
    tab.appendRow(header);
    group.members.forEach(memberID => {
      const index = studenstRegisterList.indexOf(memberID);
      const row = [
        studentObjectsList[index].name,
        studentObjectsList[index].phone,
        studentObjectsList[index].email
      ];
      tab.appendRow(row);
    });
    tab.appendRow([' ']);
  });

  const lateralColumn = tab.getDataRange().getLastColumn() + 2;
  tab.getRange(1, lateralColumn, 1, 1).setValue('Lista de Espera');
  tab.getRange(2, lateralColumn, 1, 4).setValue(['Nome', 'Telefone', 'Email', 'Opções']);
  const waitlist = [];
  studentObjectsList.forEach(student => {
    if (!student.status.valid) return;
    if (!student.status.waitlist) return;
    const options = 'G';
    options.concat(student.choices.opt1.id);
    options.concat(` ou G${student.choices.opt2.id}`);
    waitlist.push([student.name, student.phone, student.email, options]);
  });
  tab.getRange(2, lateralColumn, waitlist.length, 4).setValues(waitlist);
};

export default exportGroups;
