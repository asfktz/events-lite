import { useRef, useEffect } from 'react';

export default function useIsFirstRender () {
  const ref = useRef(true);
  useEffect(() => void (ref.current = false), []);
  return ref.current;
};