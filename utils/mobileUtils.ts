export const isMobileApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.startsWith('app.');
};

export const hasVibrationSupport = (): boolean => {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
};

export const vibrateOnPress = (): void => {
  if (isMobileApp() && hasVibrationSupport()) {
    try {
      navigator.vibrate(50); // Short 50ms vibration
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }
}; 