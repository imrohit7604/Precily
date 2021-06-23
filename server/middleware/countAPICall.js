const { setTotalAPICall, getTotalAPICall } = require("../util/util");
module.exports = async function (req, res, next) {
  setTotalAPICall();
  console.log("API hit is", getTotalAPICall());
  next();
};
