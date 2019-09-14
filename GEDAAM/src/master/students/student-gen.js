import Student from '../../classes/student';
import getBonuses from './get-bonuses';
import parseGroupID from '../groups/id-parser';

const studentGenerator = (formsObjects, groupsArray, bonusTab, startKey = 1) => {
  const studentObjectsArray = [];

  const bonusObjects = [];
  const [bonusHeader, ...bonusValues] = bonusTab
    .getRange(1, 1, bonusTab.getLastRow(), bonusTab.getLastColumn())
    .getValues();
  bonusHeader.forEach((header, i) => {
    bonusObjects.push({ [header]: bonusValues.map(row => +row[i]).filter(item => item) });
  });

  const inversionKey = Object.keys(formsObjects).length; // this is a workaround due to deadline
  formsObjects.forEach((formsObject, index) => {
    if (!formsObject.register) return;
    const student = new Student({
      primaryKey: index + startKey,
      register: formsObject.register,
      name: formsObject.name,
      email: formsObject.email,
      phone: formsObject.phone,
      university: formsObject.university,
      position: {
        stamp: formsObject.timestamp,
        bonuses: getBonuses(formsObject.register, bonusObjects),
        linear: index - inversionKey // this should be replaced with a more appropriate formula
      },
      choices: {
        opt1: {
          id1: parseGroupID(formsObject.opt1, groupsArray),
          title1: formsObject.opt1
        },
        opt2: {
          id2: parseGroupID(formsObject.opt2, groupsArray),
          title2: formsObject.opt2
        }
      },
      status: {}
    });

    studentObjectsArray.push(student);
  });

  return studentObjectsArray;
};

export default studentGenerator;
