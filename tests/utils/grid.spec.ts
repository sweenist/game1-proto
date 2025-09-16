import { describe, expect, it } from "vitest";
import { gridCells } from '@src/utils/grid';

describe('gridCells', () => {
  const testCases = [
    { n: 16, expected: 256 },
    { n: 0, expected: 0 },
    { n: -15, expected: -240 }
  ]
  it.each(testCases)('should return 16x number', ({ n, expected }) => {
    const target = gridCells(n);

    expect(target).toEqual(expected);
  })

})