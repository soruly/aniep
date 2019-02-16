module.exports = (filename) => {
  let num = null;

  num = filename.match(/第 *(\d+) *(?:集|話|话|回)/); // 第01集
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[(\d{1,2})\((?:OVA|OAD)\)]/); // [%num(OVA)]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/[^\w\d](?:OVA|OAD|SP|OP|ED|NCOP|NCED|EX)[_ ]{0,1}(\d{1,2})[^\w\d]/); // [OVA1]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/ (?:#|＃)(\d{1,2})(?: |\.)/); // #1
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/【(\d+)】/); // 【01】
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/「(\d+)」/); // 「01」
  if (num !== null) {
    return parseFloat(num[1]);
  }


  num = filename.replace(/.+? (\d\d) \[.+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+? (\d\d)\[.+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+?\[(\d+\.*\d+)[^pPx]{0,4}].+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+?\[(\d+)[ _-].+?].+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.*(?:EP|第) *(\d+\.*\d*).+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/^(\d+\.*\d+).{0,4}.+/i, "$1"); // start with %num
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.match(/.+? - (\d+)[-~](\d+).+/); // - %num-%num
  if (num !== null) {
    return [
      parseFloat(num[1]),
      parseFloat(num[2])
    ];
  }

  num = filename.match(/.+? - (\d+)\((\d+)\).+/); // - %num(%num)
  if (num !== null) {
    return [
      parseFloat(num[1]),
      parseFloat(num[2])
    ].sort().join("|");
  }

  num = filename.replace(/.+? - (\d+\.*\d+).{0,4}.+/i, "$1"); // - %num
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+? (\d+\.*\d+)[^xpP\]]{0,4} .+/i, "$1"); // %num
  if (num !== filename) {
    return parseFloat(num);
  }

  return null;
};


