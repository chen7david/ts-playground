import { sum } from '../src/test'

const testCases = [
  [1, 2, 3],
  [2, 3, 5],
  [10, 20, 30],
  [-1, -1, -2],
  [0, 0, 0],
]

describe('example', () => {
  test.each(testCases)('sum(%i, %i) should be %i', (a, b, expected) => {
    expect(sum(a, b)).toBe(expected)
  })
})
