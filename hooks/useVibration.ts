import { useCallback } from 'react';
import { vibrateOnPress } from '../utils/mobileUtils';

type EventType = React.MouseEvent | React.TouchEvent;
type CallbackType = (event: EventType) => void;

export const useVibration = (callback?: CallbackType) => {
  return useCallback((event: EventType) => {
    vibrateOnPress();
    if (callback) callback(event);
  }, [callback]);
}; 