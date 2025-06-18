export const isMobileApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.startsWith('app.');
};

export const vibrateOnPress = (): void => {
  if (typeof navigator !== 'undefined' && navigator.vibrate && isMobileApp()) {
    navigator.vibrate(50); // Short 50ms vibration
  }
}; 