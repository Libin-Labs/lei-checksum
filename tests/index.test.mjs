import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known LEI reference', () => {
  assert.ok(api.validateLei('529900T8BM49AURSDO55'));
});
test('computed digits', () => {
  assert.equal(api.leiCheckDigits('529900T8BM49AURSDO'), '55');
});
test('mismatch false', () => {
  assert.equal(api.validateLei('529900T8BM49AURSDO56'), false);
});
test('reserved00 validation', () => {
  assert.throws(() => api.validateLei('529911T8BM49AURSDO55'));
});
test('uppercase and exact length', () => {
  assert.throws(() => api.validateLei('529900t8bm49aursdo55'));
  assert.throws(() => api.leiCheckDigits('529900T8BM49AURSDO\n'));
});
test('independent bigint mod97', () => {
  for (let i = 0; i < 50; i++) {
    const body = '123400' + String(i).padStart(12, '0'),
      digits = api.leiCheckDigits(body);
    assert.equal(BigInt(body + digits) % 97n, 1n);
  }
});
