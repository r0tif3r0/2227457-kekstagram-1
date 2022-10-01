const randomNum = function (minNum, maxNum) {
  if ((minNum < 0 || maxNum < 0) || (minNum > maxNum)) {
    return 0;
  }
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

const maxStringLength = function(str, maxLen) {
  return str.length <= maxLen;
}
