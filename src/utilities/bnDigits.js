export const convertDigits = (number) => {
  const EnToBnDigits = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.', // optional: keep decimal dot
  };

  if (number === null || number === undefined) return '';
  return number.toString().split('').map(char => EnToBnDigits[char] || char).join('');
};