const getBonuses = (register, objects) => {
  const bonuses = [];
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key].includes(register)) {
        bonuses.push({ [key.slice(0, key.indexOf('='))]: key.slice(key.indexOf('=') + 1) });
      }
    });
  });
  return bonuses;
};

export default getBonuses;
