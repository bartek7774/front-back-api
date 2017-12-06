function pick(obj, arr) {
  let res = {};
  arr.forEach((value) => {
    if (value in obj) {
      res[value] = obj[value];
    }
  });
  return res;
}
module.exports = { pick };