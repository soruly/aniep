module.exports = (filename) => {
  if (filename.match(/\W(?:OVA|OAD|Special|Preview|Prev)[\W_]/i)) {
    return -2;
  }
  if (filename.match(/\WSP\W{0,1}\d{1,2}/i)) {
    return -3;
  }
  if (filename.match(/.*(?:Ohys-Raws|Leopard-Raws|ZhuixinFan).*/i)) {
    return 0;
  }
  let num = -1;

  num = filename.replace(/.+? (\d\d) \[.+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+? (\d\d)\[.+/i, "$1");
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+?\[(\d+\.*\d+).{0,4}].+/i, "$1");
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

  num = filename.replace(/.+? - (\d+\.*\d+).{0,4}.+/i, "$1"); // - %num
  if (num !== filename) {
    return parseFloat(num);
  }

  num = filename.replace(/.+? (\d+\.*\d+).{0,4} .+/i, "$1"); // %num
  if (num !== filename) {
    return parseFloat(num);
  }

  return null;
};


