const parseGroupId = (title, range) => {
  let id = 0;
  range.some(row => {
    id = row.shift();
    return row.includes(title);
  });
  return id;
};

export default parseGroupId;
