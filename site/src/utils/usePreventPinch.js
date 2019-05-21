import useDOMListener from './useDOMListener';

export default function usePreventPinch() {
  useDOMListener(document, 'gesturestart', (e) => {
    e.preventDefault();
  });
}