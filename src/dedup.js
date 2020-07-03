const dedup = arr =>
  arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

export default dedup;
