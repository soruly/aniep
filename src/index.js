module.exports = (filename) => {
  let num = null;
  filename = filename.replace(/[\r\n]$/, ""); // remove extra newlines from end of string
  filename = filename.replace(/((?:\.mp4)+)$/, ""); // remove file extension
  filename = filename.replace(/(v\d)$/i, ""); // remove v2, v3 suffix
  filename = filename.replace(/(\d)v[0-5]/i, "$1"); // remove v2 from 13v2
  filename = filename.replace(/(\[\d{4,}])/, ""); // remove years and dates like [2019] [20190301]
  // filename = filename.replace(/(\[[0-9a-f]{6,8}])/, ""); // remove checksum like [c3cafe11]

  num = filename.match(/^(\d{1,3})(?:-|~)(\d{1,3})$/); // 13.mp4
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])];
  }

  const chineseToDigit = (string) =>
    ({
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10,
      十一: 11,
      十二: 12,
      十三: 13,
      十四: 14,
      十五: 15,
    }[string]);

  num = filename.match(/第([一二三四五六七八九十]+)(?:集|話|话|回|夜)/); // 第三話
  if (num !== null) {
    return parseFloat(chineseToDigit(num[1]));
  }

  num = filename.match(/第 *(\d+(?:\.\d)*) *(?:集|話|话|回|夜)/); // 第 13.5 話
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/第 *(\d+)-(\d+) *(?:集|話|话|回|夜)/); // 第 01-13 話
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])];
  }

  num = filename.match(/(?:s|v)\d{1,2}ep*(\d{1,2})/i); // S03EP13
  if (num !== null) {
    return parseFloat(num[1]);
  }

  // special case
  num = filename.match(/ - (\d\d(?:\.\d)*) *(?:Fin)* *\[720]/i); // xxxx - 13 [720]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[(\d{1,3}(?:\.\d)*) *(?:END)*]/); // [13END]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[(\d{1,2})\((?:OVA|OAD)\)]/); // [14(OVA)]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(
    /[^\w\d](?:OVA|OAD|SP|OP|ED|NCOP|NCED|EX|CM|PV|Preview|Yokoku|メニュー|Menu|エンディング|Movie)[-_ ]{0,1}(\d{1,2})[^\w\d]/i
  ); // [OVA1]
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/【(\d+)】/); // 【13】
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/「(\d+)」/); // 「13」
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[(\d+)-(\d+)\((\d+)-(\d+)\)]/); // xxxx[01-02(13-14)]xxxx
  if (num !== null) {
    return [
      [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join(","),
      [parseFloat(num[3]), parseFloat(num[4])].sort((a, b) => a - b).join(","),
    ]
      .sort((a, b) => parseFloat(a.split(",")[1]) - parseFloat(b.split(",")[1]))
      .join("|"); // "1,2|13,14"
  }

  num = filename.match(/\[(\d+)\((?:EP\.)*(\d+)\)]/i); // xxxx[01(ep.13)]xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join("|");
  }

  num = filename.match(/\[(\d+)(?: |_|-)(?:S\d)(?: |_|-)(\d+)(?: END)*]/i); // xxxx[13 s2-01]xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join("|");
  }

  num = filename.match(/\[(\d+(?:\.\d)*)(?:-|&)(\d+(?:\.\d)*)(?:END)*]/); // xxxx[01-13END]xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])];
  }

  num = filename.match(/\[(\d+)-(\d+)_(\d+)-(\d+)]/); // xxxx[01-02_13-14]xxxx
  if (num !== null) {
    return [
      [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join(","),
      [parseFloat(num[3]), parseFloat(num[4])].sort((a, b) => a - b).join(","),
    ]
      .sort((a, b) => parseFloat(a.split(",")[1]) - parseFloat(b.split(",")[1]))
      .join("|"); // "1,2|13,14"
  }

  num = filename.match(/\[(\d+)_(\d+)]/); // xxxx[01_13]xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join("|");
  }

  num = filename.match(/ - (\d{1,3}(?:\.\d)*) *\((?:s\d-)*(\d{1,3}(?:\.\d)*)\)/i); // xxxx - 01.5 (s1-13.5)xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])].sort((a, b) => a - b).join("|");
  }

  num = filename.match(/.+\[(\d{1,3}(?:\.\d)*)[^pPx]{0,4}]/i); // xxxx[13.5yyyy]xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[(\d{1,3})[ _-].+?]/); // xxxx[13-xxxx]xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\[[^]+_(\d{1,2})]/); // xxxx[xxxx_13]xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/ (\d\d) \[/); // xxxx 13 [
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/(?: |\[|]|-)(\d\d)(?:\[|])/); // xxxx[ 13[xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/s\d-(\d{1,2})/i); // xxxxs2-13xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/(?:EP|Episode) *(\d{1,3}(?:\.\d\D)*)/i); // xxxxEP 13.5xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/^(\d{1,3}(?:\.\d)*) - /); // 13.5 - xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/ - (\d+)[-~](\d+)/); // xxxx - 13-26xxxx
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])];
  }

  num = filename.match(/ - (\d{1,3}(?:\.\d)*)/); // xxxx - 13.5xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/^(\d{1,3}(?:\.\d)*)\D/); // 13.5xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/(?:#|＃)(\d{1,2})\D/); // xxxx#13xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/ (\d{1,3}(?:\.\d)*)[^xpP\]\d]{0,4} /); // xxxx 13.5yyyy xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\W(\d{1,3})-(\d{1,3})$/); // xxxx01-13.mp4
  if (num !== null) {
    return [parseFloat(num[1]), parseFloat(num[2])];
  }

  num = filename.match(/(\d{1,3})$/); // xxxx13.mp4
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\D\.(\d{1,3})\.\D/); // xxxx.13.xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/\D(\d{1,3}) - /); // xxxx13 - xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  num = filename.match(/(?: |_)(\d{1,3})_/); // xxxx_13_xxxx
  if (num !== null) {
    return parseFloat(num[1]);
  }

  return null;
};
