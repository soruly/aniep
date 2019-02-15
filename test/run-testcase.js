const fs = require("fs");
const path = require("path");
const getEp = require("../src/index");

const answerFile = fs.readFileSync(path.join(__dirname, "../test/answer.txt"), "utf-8");

const answerList = new Map(
  answerFile
    .split("\n")
    .map((line) => line.split("\t").reverse())
);

const rawAnswerList = new Map(
  answerFile
    .split("\n")
    .filter((line) => line.match(/(\[Ohysi-Raws]|\[Leopard-Raws])/))
    .map((line) => line.split("\t").reverse())
);

const chineseAnswerList = new Map(
  answerFile
    .split("\n")
    .filter((line) => line.match(/(\[Airota|\[BeanSub|\[CASO|\[Comicat|\[DHR|\[DMG|\[Dymy|\[EMD|\[FLsnow|\[FZSD|\[HKG|\[HYSUB|\[JYFanSUB|\[KNA|\[KTXP|\[Kamigami|\[LKSUB|\[Liuyun|\[Mabors|\[Mmch\.sub|\[Nekomoe|\[POPGO|\[Pussub|\[RH|\[Sakurato|\[SumiSora|\[TUcaptions|\[UHA-WINGS|\[WOLF|\[YUI-7)/))
    .map((line) => line.split("\t").reverse())
);

let wrong = 0;
answerList.forEach((num, filename) => {
  if (`${getEp(filename)}` !== num) {
    wrong += 1;
    console.log(`Expect: ${`${num}`.padStart(6)} | Got: ${`${getEp(filename)}`.padStart(6)} | ${filename}`);
  }
});

let chineseWrong = 0;
chineseAnswerList.forEach((num, filename) => {
  if (`${getEp(filename)}` !== num) {
    chineseWrong += 1;
  }
});

let rawWrong = 0;
rawAnswerList.forEach((num, filename) => {
  if (`${getEp(filename)}` !== num) {
    rawWrong += 1;
  }
});

const showResults = (numFailed, total, title) => {
  console.log();
  console.log(`${title} (${((total - numFailed) / total * 100).toFixed(4)}%)`);
  console.log(`${(total - numFailed).toString().padStart(6)}/${total} testcases passed (${((total - numFailed) / total * 100).toFixed(4)}%)`);
  console.log(`${numFailed.toString().padStart(6)}/${total} testcases failed (${(numFailed / total * 100).toFixed(4)}%)`);
};

showResults(rawWrong, rawAnswerList.size, "Leopard-Raws + Ohys-Raws dataset");
showResults(chineseWrong, chineseAnswerList.size, "Chinese dataset");
showResults(wrong, answerList.size, "All test");
