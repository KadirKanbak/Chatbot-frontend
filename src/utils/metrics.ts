import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions are for a 5.5 inch screen (iPhone 8 Plus)
const baseWidth = 414;
const baseHeight = 736;

const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

export const scale = Math.min(widthScale, heightScale);

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export const metrics = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  headerHeight: normalize(60),
  padding: {
    small: normalize(8),
    medium: normalize(16),
    large: normalize(24),
    xlarge: normalize(32),
  },
  borderRadius: {
    small: normalize(8),
    medium: normalize(12),
    large: normalize(16),
    xlarge: normalize(24),
  },
  icons: {
    tiny: normalize(16),
    small: normalize(20),
    medium: normalize(24),
    large: normalize(32),
    xlarge: normalize(40),
  },
  fontSize: {
    tiny: normalize(12),
    small: normalize(14),
    medium: normalize(16),
    large: normalize(20),
    xlarge: normalize(24),
    xxlarge: normalize(28),
  },
};
