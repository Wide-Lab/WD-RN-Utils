import { shadowGenerator } from '../Styles';

describe('shadowGenerator', () => {
  it('should clamp elevation values outside the range [1,  24]', () => {
    expect(shadowGenerator(-3)).toEqual({
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation: 1,
    });

    expect(shadowGenerator(26)).toEqual({
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.58,
      shadowRadius: 16,
      elevation: 24,
    });
  });

  it('should calculate shadow properties correctly within the range [1,  24]', () => {
    // Test cases for elevations within the range [1,  24]
    // Replace the expected values with the actual expected results based on your logic
    const testCases = [
      {
        input: 1,
        expected: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.18,
          shadowRadius: 1,
          elevation: 1,
        },
      },
      {
        input: 5,
        expected: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      },
      {
        input: 12,
        expected: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        },
      },
      {
        input: 19,
        expected: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 9 },
          shadowOpacity: 0.5,
          shadowRadius: 12.35,
          elevation: 19,
        },
      },
      {
        input: 24,
        expected: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.58,
          shadowRadius: 16,
          elevation: 24,
        },
      },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(shadowGenerator(input)).toEqual(expected);
    });
  });
});
