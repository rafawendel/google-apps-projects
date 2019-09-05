const exportWaitlist = (studentsList, tab) => {
  tab.clear();
  tab.appendRow(['Nome', 'Telefone', 'Email', 'Opções']);
  tab.appendRow(['Lista de Espera']);
  studentsList.forEach(student => {
    if (!student.status.waitlist) return;
    tab.appendRow([
      student.name,
      student.phone,
      student.email,
      `G${student.choices.opt1.id} ou G${student.choices.opt2.id}`
    ]);
  });
};

export default exportWaitlist;
