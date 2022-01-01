export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  getCurrencySign,
  getNiceRandomColor

};

function makeId(length = 6) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// getDayName('12/25/2021', 'he') ->  'יום שבת'
function getDayName(date, locale) {
  date = new Date(date);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[date.getMonth()];
}

function getCurrencySign(sign) {
  switch (sign) {
    case 'EUR':
      return '€';
    case 'ILS':
      return '₪';
    case 'USD':
      return '$';
    default:
      return '';
  }
}
// function getNiceRandomColor() {
//   var green = 'rgb(83, 190, 83)';
//   var red = 'rgb(218, 63, 76)';
//   var blue = 'rgb(55, 182, 214)';
//   var yellow = 'rgb(223, 202, 86)';
//   var orange = 'rgb(240, 178, 62)';
//   var niceColors = [green, red, blue, yellow, orange];
//   var drawnNum = getRandomIntInclusive(0, niceColors.length);
//   var randColor = niceColors[drawnNum];
//   return randColor;
// }
function getNiceRandomColor() {
  let pink = '#f2dce8';
  let mint = '#a6dcd0';
  let purple = '#d8b5f6';
  let yellow = '#f8f8b8';
  let blue = 'rgb(166 200 220)';
  let orange = 'rgb(240, 178, 62)';
  let niceColors = [pink, mint, purple, yellow, blue, orange];
  let drawnNum = getRandomIntInclusive(0, niceColors.length);
  let randColor = niceColors[drawnNum];
  return randColor;
}