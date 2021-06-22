let count = 0;
module.exports = async function (req, res, next) {
  count++;
  console.log("API hit is", count);
  next()
};
