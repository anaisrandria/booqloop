import { expect, test } from 'vitest';
import { sum } from './page';

test('calculate 1 + 2', () => {
  expect(sum(1, 2)).toBe(3);
});
