import { useEffect } from 'react';

export default function useDOMListener(el, eventName, callback) {
  useEffect(() => {
    document.addEventListener(eventName, callback);

    return function cleanup() {
      document.removeEventListener(eventName, callback);
    };
  }, []);
}