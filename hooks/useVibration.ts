import { useCallback } from 'react';
import { vibrateOnPress } from '../utils/mobileUtils';

export const useVibration = (callback?: () => void) => {
  return useCallback((event?: React.TouchEvent | React.MouseEvent) => {
    // Always vibrate first
    vibrateOnPress();
    
    // Then execute the callback if provided
    if (callback) {
      callback();
    }
  }, [callback]);
}; 