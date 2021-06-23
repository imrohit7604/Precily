let count = 0;

const setTotalAPICall = () => {
  count++;
};

const getTotalAPICall = () => {
  return count;
};

module.exports.setTotalAPICall = setTotalAPICall;
module.exports.getTotalAPICall = getTotalAPICall;
