module.exports = (filename) => {
  let num = null;

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


