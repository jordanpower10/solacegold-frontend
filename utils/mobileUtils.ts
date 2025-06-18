export const isMobileApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.startsWith('app.');
};

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

export const hasVibrationSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'vibrate' in window.navigator;
};

export const vibrateOnPress = (): void => {
  if (!isMobileDevice() || !hasVibrationSupport()) return;
  
  try {
    // Try a more noticeable vibration pattern
    window.navigator.vibrate([15, 10, 15]); // vibrate 15ms, pause 10ms, vibrate 15ms
  } catch (error) {
    // Fallback to a simple vibration if pattern doesn't work
    try {
      window.navigator.vibrate(40);
    } catch (fallbackError) {
      console.warn('Vibration failed:', fallbackError);
    }
  }
};

// Prevent double-tap zoom on mobile
export const preventDoubleTapZoom = (element: HTMLElement): void => {
  let lastTap = 0;
  element.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault();
    }
    lastTap = currentTime;
  });
};

// Force touch events to be handled before mouse events
export const forceTouchFirst = (): void => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('touchstart', () => {}, { passive: false });
  window.addEventListener('touchmove', () => {}, { passive: false });
  window.addEventListener('touchend', () => {}, { passive: false });
}; 