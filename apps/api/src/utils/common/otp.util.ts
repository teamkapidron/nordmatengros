export function generateOTP(digit: number) {
  const min = Math.pow(10, digit - 1);
  const max = Math.pow(10, digit) - 1;
  return Math.floor(min + Math.random() * (max - min));
}
