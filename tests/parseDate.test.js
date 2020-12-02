import parseDate from "../src/components/utility/parseDate"

describe('parseDate', () => {
  it('should return date correctly', () => {
    expect(parseDate('2020-12-02T14:48:34.34Z')).toBe('2 ธ.ค. 2563')
    expect(parseDate('2020-12-12T14:48:34.34Z')).toBe('12 ธ.ค. 2563')
    expect(parseDate('2020-01-02T14:48:34.34Z')).toBe('2 ม.ค. 2563')
  })
})