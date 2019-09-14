/** Removes duplicates based in the most recent input and student register
 * @param {Object[]} objectList Array of objects
 * @param {String} registerKey // String of key for the register (should be coupled with university to avoid misinterpretation)
 * @param {String} orderKey // String of key that will order the inputs. Generally timestamp
 */
const JSONDuplicateHandler = (objectList, registerKey, orderKey = 'timestamp') => {
  objectList.sort((a, b) => b[orderKey] - a[orderKey]);
  const registers = objectList.map(obj => obj[registerKey]);
  const filteredOjectList = objectList.filter(
    (obj, i) => registers.indexOf(obj[registerKey]) === i
  );
  return filteredOjectList;
};

export default JSONDuplicateHandler;
