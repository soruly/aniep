# aniep
![dependencies](https://img.shields.io/david/soruly/aniep.svg?style=flat)
[![pipeline status](https://gitlab.com/soruly/aniep/badges/master/pipeline.svg)](https://gitlab.com/soruly/aniep/commits/master)
[![coverage report](https://gitlab.com/soruly/aniep/badges/master/coverage.svg)](https://gitlab.com/soruly/aniep/-/jobs)
[![License](https://img.shields.io/github/license/soruly/aniep.svg)](https://github.com/soruly/aniep/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/aniep.svg?style=flat)

Extract episode number from anime file name

## Install

```
npm install aniep --save
```

## Usage

```javascript
const aniep = require("aniep");

aniep("[Leopard-Raws] Yakusoku no Neverland - 04 RAW (THK 1280x720 x264 AAC).mp4"); // return 4
aniep("[Leopard-Raws] Youjo Senki - 06.5 RAW (ATX 1280x720 x264 AAC).mp4"); // return 6.5
aniep("[Leopard-Raws] Sora to Umi no Aida Special (SUN 1280x720 x264 AAC).mp4"); // return null
```

## Development

To test the program's accuracy:
```
npm test
```

Dataset is defined in test/answer.txt, with over 100,000 file names found from Chinese anime websites. The text file is a tab-separated list of testcases. First column is expected answer, second column is input file name. 

You can test your implementation (defined in src/index.js) against the dataset to see how well your episode number extraction function performs.


