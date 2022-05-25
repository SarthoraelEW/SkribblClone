const fs = require('fs');

exports.getWords = () => {
  const data = fs.readFileSync('words.txt').toString();
  const stringWords = data.split(';');
  const words = [];
  stringWords.forEach(word => {
    word.replace('/n', '');
    const wordTraductions = new Map();
    const traductionStrings = word.split(',');
    traductionStrings.forEach((trad) => {
      const separatorIndex = trad.indexOf(':');
      wordTraductions.set(trad.substring(0, separatorIndex), trad.substring(separatorIndex + 1));
    });
    words.push(wordTraductions);
  });
  return words;
};

exports.getThreeRandomWords = (words) => {
  const MAX = words.length;

  const firstIndex = Math.floor(Math.random() * MAX);
  let secondIndex = -1;
  while (secondIndex !== -1 && secondIndex !== firstIndex) {
    secondIndex = Math.floor(Math.random() * MAX);
  }
  let thirdIndex = -1;
  while (thirdIndex !== -1 && thirdIndex !== firstIndex && thirdIndex !== secondIndex) {
    thirdIndex = Math.floor(Math.random() * MAX);
  }
  return [words[firstIndex], words[secondIndex], words[thirdIndex]];
};