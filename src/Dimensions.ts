import { Dimensions } from 'react-native';

/**
 * Retrieves the dimensions of the window.
 *
 * This constant holds the dimensions of the window, which includes properties
 * such as width and height. It uses the `Dimensions.get` method from React Native
 * to obtain the current window dimensions.
 *
 * @constant
 */
export const window = Dimensions.get('window');
/**
 * Retrieves the screen dimensions of the device.
 *
 * This constant uses the `Dimensions.get` method from React Native to obtain
 * the dimensions of the device's screen. The dimensions include properties
 * such as width, height, scale, and fontScale.
 *
 * @constant
 */
export const screen = Dimensions.get('screen');
