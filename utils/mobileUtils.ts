export const isMobileApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.startsWith('app.');
};

export const hasVibrationSupport = (): boolean => {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
};

export const vibrateOnPress = (): void => {
  try {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  } catch (error) {
    console.warn('Vibration failed:', error);
  }
}; 