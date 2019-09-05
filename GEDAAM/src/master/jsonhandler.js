/* eslint-disable prefer-destructuring */
const createFormObjects = (content, reference) => {
  const studentsJSON = {};
  let data = [];

  Object.keys(reference).forEach(key => {
    data = content.getRange(reference[key][0]).getValues();
    data.forEach((row, id) => {
      if (!row[0]) return;
      if (!studentsJSON[id]) {
        studentsJSON[id] = {};
      }
      if (data[0].length === 1) {
        studentsJSON[id][key] = row[0]; // { [key]: row[0] }
      } else {
        const arr = [];
        reference[key].forEach((value, i) => {
          if (i > 0) {
            const obj = {};
            obj[value] = row[i - 1];
            arr.push(obj);
          }
        });
        studentsJSON[id][key] = arr;
      }
    });
  });
  return studentsJSON;
};

export default createFormObjects;
