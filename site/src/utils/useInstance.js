import { useRef, useEffect } from 'react';

export default function useInstance ({ init, cleanup }) {
  const ref = useRef(null);
  
  if (!ref.current) {
    ref.current = init();
  }

  useEffect(() => {
    return () => cleanup(ref.current);
  }, []);

  return ref.current;
}