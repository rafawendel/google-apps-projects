const exportWaitlist = (studentsList, tab) => {
  tab.clear();
  tab.appendRow(['Nome', 'Telefone', 'Email', 'Opções']);
  tab.appendRow(['Lista de Espera']);
  studentsList.forEach(student => {
    if (!student.status.waitlist) return;
    const options = 'G';
    if (student.choices.opt1.id) options.concat(student.choices.opt1.id);
    if (student.choices.opt2.id) options.concat(` ou G${student.choices.opt2.id}`);
    tab.appendRow([student.name, student.phone, student.email, options]);
  });
};

export default exportWaitlist;
