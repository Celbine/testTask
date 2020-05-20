const toDigits = (number: number | string, length: number = 2) => {
  const p = 10 ** length;
  return Math.floor(Number(number) * p) / p;
};

export default toDigits;
