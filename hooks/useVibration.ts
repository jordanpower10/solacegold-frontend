import { useCallback } from 'react';
import { vibrateOnPress, isMobileApp } from '../utils/mobileUtils';

type EventType = React.MouseEvent | React.TouchEvent;
type CallbackType = (event: EventType) => void;

export const useVibration = (callback?: CallbackType) => {
  return useCallback((event: EventType) => {
    // Prevent double triggering on devices that fire both click and touch events
    if (event.type === 'mousedown' && isMobileApp()) {
      return;
    }

    // Call vibrate before the callback to ensure immediate feedback
    vibrateOnPress();

    if (callback) {
      callback(event);
    }
  }, [callback]);
}; 