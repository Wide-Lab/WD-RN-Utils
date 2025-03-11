import { Dimensions } from 'react-native';
import { screen, window } from '../Dimensions';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(),
  },
}));

describe('Dimensions', () => {
  it('should return window dimensions', () => {
    const mockWindowDimensions = { width: 360, height: 640 };
    (Dimensions.get as jest.Mock).mockReturnValueOnce(mockWindowDimensions);

    expect(window).toEqual(mockWindowDimensions);
  });

  it('should return screen dimensions', () => {
    const mockScreenDimensions = { width: 360, height: 640 };
    (Dimensions.get as jest.Mock).mockReturnValueOnce(mockScreenDimensions);

    expect(screen).toEqual(mockScreenDimensions);
  });
});
