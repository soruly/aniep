module.exports = (filename) => {
  const type = null;
  num = filename.match(
    /[^\w\d](?:OVA|OAD|SP|OP|ED|NCOP|NCED|EX|CM|PV|Preview|Yokoku|メニュー|Menu|エンディング|Movie)[-_ ]{0,1}(\d{1,2})[^\w\d]/i
  ); // [OVA1]
  if (num !== null) {
    return parseFloat(num[1]);
  }
  return type;
};
