function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function remainder97(text: string): number {
  let r = 0;
  for (const c of text) {
    const code = c.charCodeAt(0),
      digits = code >= 65 ? String(code - 55) : c;
    for (const d of digits) r = (r * 10 + Number(d)) % 97;
  }
  return r;
}
function body(text: string): void {
  strictText(text, 18);
  if (text.length !== 18 || /[^A-Z0-9]/.test(text) || text.slice(4, 6) !== '00')
    throw new RangeError('LEI18 body syntax with reserved00');
}
export function leiCheckDigits(text: string): string {
  body(text);
  return String(98 - remainder97(text + '00')).padStart(2, '0');
}
export function validateLei(text: string): boolean {
  strictText(text, 20);
  if (text.length !== 20 || /[^0-9]/.test(text.slice(18))) throw new RangeError('LEI20 syntax');
  body(text.slice(0, 18));
  return remainder97(text) === 1;
}
