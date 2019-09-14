/* const calculatePriorities = student => {
  let { multiplier } = student.position;
  if (student.university !== 'UFMG') {
    multiplier -= student.position.bonuses.forEach(bonus => {
      if (Object.keys(bonus)[0] === 'Workshop') return bonus[Object.keys(bonus)[0]];
      return 0;
    });
  }
  return student.primaryKey - multiplier;
};
 */
