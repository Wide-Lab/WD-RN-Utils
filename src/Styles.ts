import { ViewStyle } from 'react-native';
import { Numbers, WDNumbers } from 'widelab-utils';

/**
 * Generates a shadow style object for a React Native component based on the specified depth.
 * The depth value is clamped between  1 and  24, and the resulting style includes shadow properties
 * such as color, offset, opacity, and radius, which are calculated using interpolation based on the depth.
 *
 * @param depth - The desired depth level for the component's shadow.
 * @returns An object containing the shadow styles for the component.
 */
export const shadowGenerator = (depth: number): ViewStyle => {
  const inputRange: [number, number] = [1, 24];
  const elevation = Numbers.numberClamp(depth, ...inputRange);

  const blurList = [
    1, 2, 4, 5, 8, 10, 10, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31,
    33, 35, 36, 38,
  ];

  const floorHeight = Math.floor(elevation * 0.5);
  const height = Math.max(1, floorHeight);
  const base = elevation - 1;
  const blur = blurList[base];

  const shadowOpacityBase = WDNumbers.interpolate(
    base,
    ...inputRange,
    0.2,
    0.6
  );
  const shadowOpacity = Number(shadowOpacityBase.toFixed(2));

  const shadowRadiusBase = WDNumbers.interpolate(blur, 1, 38, 1, 16);
  const shadowRadius = Number(shadowRadiusBase.toFixed(2));

  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity,
    shadowRadius,

    elevation,
  };
};
