import Student from '../classes/student';
import getBonuses from './getbonuses';
import parseGroupID from './idparser';

const studentGenerator = (formObject, groupsMap, bonusTab, startKey = 0) => {
  const studentsArray = [];

  const bonusObjects = [];
  const [bonusHeader, ...bonusValues] = bonusTab
    .getRange(1, 1, bonusTab.getLastRow(), bonusTab.getLastColumn())
    .getValues();
  bonusHeader.forEach((header, i) => {
    bonusObjects.push({ [header]: bonusValues.map(row => +row[i]).filter(item => item) });
  });

  const inversionKey = Object.keys(formObject).length; // this is a workaround due to deadline
  Object.keys(formObject).forEach(key => {
    if (!formObject[key].register) return;
    const student = new Student({
      primaryKey: inversionKey - +key + startKey, // bad implementation
      register: formObject[key].register,
      name: formObject[key].name,
      email: formObject[key].email,
      phone: formObject[key].phone,
      university: formObject[key].university,
      position: {
        stamp: formObject[key].timestamp,
        bonuses: getBonuses(formObject[key].register, bonusObjects)
      },
      choices: {
        opt1: {
          id1: parseGroupID(formObject[key].opt1, groupsMap),
          title1: formObject[key].opt1
        },
        opt2: {
          id2: parseGroupID(formObject[key].opt2, groupsMap),
          title2: formObject[key].opt2
        }
      },
      status: {}
    });

    studentsArray.push(student);
  });

  return studentsArray;
};

export default studentGenerator;
