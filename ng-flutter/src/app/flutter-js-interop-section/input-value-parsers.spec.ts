import { parseCounterValueFromInput, parseTextValueFromInput } from './input-value-parsers';

describe('parseCounterValueFromInput', () => {
  it('should parse a valid integer', () => {
    const event = {
      target: { value: '42' },
    } as unknown as Event;
    expect(parseCounterValueFromInput(event)).toBe(42);
  });

  it('should return 0 for empty string', () => {
    const event = {
      target: { value: '' },
    } as unknown as Event;
    expect(parseCounterValueFromInput(event)).toBe(0);
  });

  it('should return 0 for invalid input', () => {
    const event = {
      target: { value: 'abc' },
    } as unknown as Event;
    expect(parseCounterValueFromInput(event)).toBe(0);
  });

  it('should return 0 for NaN from parseInt', () => {
    const event = {
      target: { value: '12.5' },
    } as unknown as Event;
    expect(parseCounterValueFromInput(event)).toBe(12);
  });

  it('should parse negative numbers', () => {
    const event = {
      target: { value: '-10' },
    } as unknown as Event;
    expect(parseCounterValueFromInput(event)).toBe(-10);
  });
});

describe('parseTextValueFromInput', () => {
  it('should extract string value from input', () => {
    const event = {
      target: { value: 'hello world' },
    } as unknown as Event;
    expect(parseTextValueFromInput(event)).toBe('hello world');
  });

  it('should return empty string for empty input', () => {
    const event = {
      target: { value: '' },
    } as unknown as Event;
    expect(parseTextValueFromInput(event)).toBe('');
  });

  it('should return empty string when value is undefined', () => {
    const event = {
      target: { value: undefined },
    } as unknown as Event;
    expect(parseTextValueFromInput(event)).toBe('');
  });

  it('should return empty string when value is null', () => {
    const event = {
      target: { value: null },
    } as unknown as Event;
    expect(parseTextValueFromInput(event)).toBe('');
  });

  it('should preserve whitespace', () => {
    const event = {
      target: { value: '  spaces  ' },
    } as unknown as Event;
    expect(parseTextValueFromInput(event)).toBe('  spaces  ');
  });
});
