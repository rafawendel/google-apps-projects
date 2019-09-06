/* eslint-disable no-param-reassign */
const studentDistributor = (students, groups) => {
  const groupsMap = groups.map(group => group);
  const groupIDs = groups.map(group => group.id);
  const localStudents = students.sort((a, b) => a.position.correction - b.position.correction);

  localStudents.forEach(student => {
    const opt1 = student.choices.opt1.id || 0;
    const opt2 = student.choices.opt2.id || 0;
    let index = 0;

    if (opt1 !== 0 || groupIDs.includes(opt1)) {
      index = groupIDs.indexOf(opt1);
      if (groupsMap[index].size.available > 0) {
        student.status.opt1 = true;
        student.status.opt2 = false;
        student.status.waitlist = false;
        groupsMap[index].members.push(student);
        groupsMap[index].size.available -= 1;
        return;
      }
    } else if (opt2 === 0 || !groupIDs.includes(opt2)) {
      student.status.valid = false;
      return;
    }
    student.status.gotOpt1 = false;

    if (opt2 !== 0 || groupIDs.includes(opt2)) {
      index = groupIDs.indexOf(opt2);
      if (groupsMap[index].size.available > 0) {
        student.status.gotOpt2 = true;
        student.status.waitlist = false;
        groupsMap[index].members.push(student);
        groupsMap[index].size.available -= 1;
        return;
      }
      student.status.gotOpt2 = false;
      student.status.waitlist = true;
    }
  });

  return [localStudents, groupsMap];
};

export default studentDistributor;
