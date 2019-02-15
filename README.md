# aniep
[![pipeline status](https://gitlab.com/soruly/aniep/badges/master/pipeline.svg)](https://gitlab.com/soruly/aniep/commits/master) [![coverage report](https://gitlab.com/soruly/aniep/badges/master/coverage.svg)](https://gitlab.com/soruly/aniep/commits/master)

Extract episode number from anime file name

## Usage

TBC

## Development

To test the program's accuracy:
```
npm test
```

Dataset is defined in test/answer.txt, with over 100,000 file names found from Chinese anime websites. The text file is a tab-separated list of testcases. First column is expected answer, second column is input file name. 

You can test your implementation (defined in src/index.js) against the dataset to see how well your episode number extraction function performs.


