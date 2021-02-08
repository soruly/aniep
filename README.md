# aniep

[![License](https://img.shields.io/github/license/soruly/aniep.svg?style=flat-square)](https://github.com/soruly/aniep/blob/master/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/soruly/aniep/Node.js%20CI?style=flat-square)](https://github.com/soruly/aniep/actions)
[![pipeline status](https://gitlab.com/soruly/aniep/badges/master/pipeline.svg?style=flat-square)](https://gitlab.com/soruly/aniep/commits/master)
[![coverage report](https://gitlab.com/soruly/aniep/badges/master/coverage.svg?style=flat-square)](https://gitlab.com/soruly/aniep/-/jobs)
![npm](https://img.shields.io/npm/v/aniep.svg?style=flat-square)

Extract episode number from anime file name (In progress, see % accuracy above)

## Install

```
npm install aniep --save
```

## Usage

#### JavaScript

```javascript
const aniep = require("aniep");

// leading zero is removed, returning a Number type
aniep("[Leopard-Raws] Yakusoku no Neverland - 04 RAW (THK 1280x720 x264 AAC).mp4"); // return 4

// floating point is supported
aniep("[Leopard-Raws] Youjo Senki - 06.5 RAW (ATX 1280x720 x264 AAC).mp4"); // return 6.5

// when it cannot find any episode number, it returns null
aniep("[Leopard-Raws] Sora to Umi no Aida Special (SUN 1280x720 x264 AAC).mp4"); // return null

// similarily, OVA also returns null
aniep("[Ohys-Raws] Boku no Kanojo ga Majime Sugiru Shobitch na Ken (2018) - OVA (BD 1280x720 x264 AAC).mp4"); // return null

// however, OVA with episode number would still return a Number
aniep("[Ohys-Raws] Amanchu! - 13 OVA (AT-X 1280x720 x264 AAC).mp4"); // return 13

// episode preview return episode Number
aniep("[Ohys-Raws] Tate no Yuusha no Nariagari - 01 Preview (AT-X 1280x720 x264 AAC).mp4"); // return 1

// for joined episode, it returns an array of Number: the first and the last episode
aniep("[Ohys-Raws] Idolish Seven - 01-02 (MX 1280x720 x264 AAC).mp4"); // return [1, 2]

// in case there are multiple possible episode number, it returns a string of episodes, using | as separator
aniep("[Ohys-Raws] High School DxD Hero - 11(10) (AT-X 1280x720 x264 AAC).mp4"); // return "10|11"
```

#### TypeScript

```typescript
import aniep from 'aniep';

// leading zero is removed, returning a Number type
aniep("[Leopard-Raws] Yakusoku no Neverland - 04 RAW (THK 1280x720 x264 AAC).mp4"); // return 4

// ...

```

special cases to be confirmed
```
2	B Gata H Kei - Vol.06 CM_02 (BD 1280x720 AVC AAC).mp4
null	B Gata H Kei - Vol.02 Menu (BD 1280x720 AVC AAC).mp4
1	[CASO][Tentai_Senshi_Sunred][BIG5][Vol05-SP1][DVDRIP][x264_AAC].mp4
2	[CASO][Tentai_Senshi_Sunred][BIG5][Vol05-SP2][DVDRIP][x264_AAC].mp4
9.5|21.5	[Dymy][Berserk 2][09.5(21.5)][BIG5][1280X720].mp4
12	[FLsnow][AIR][Ep12_Creditless_ED][DVDrip][x264_AAC].mp4
1|25	[HKACG][Lupin Sansei 2015][25_OVA1][BIG5_JP][x264_AAC][720p].mp4
06,07|226,227	[SOSG&52wy][Naruto_Shippuuden][226-227(06-07)][BIG5][x264_AAC].mp4
3|3.75	[諸神字幕組][進擊的巨人][Shingeki no Kyojin][OAD3][#3.75][720P][中日雙語字幕][MP4].mp4
4|0.5	[諸神字幕組][進擊的巨人][Shingeki no Kyojin][OAD4][#0.5A][720P][中日雙語字幕][MP4].mp4
5|0.5	[諸神字幕組][進擊的巨人][Shingeki no Kyojin][OAD5][#0.5B][576P][中日雙語字幕][MP4].mp4
```

## Development

To test the program's accuracy:
```
npm test
```

Dataset is defined in test/answer.txt, with over 100,000 file names found from Chinese anime websites. The text file is a tab-separated list of testcases. First column is expected answer, second column is input file name. 

You can test your implementation (defined in src/index.js) against the dataset to see how well your episode number extraction function performs.


