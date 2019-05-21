import { useEffect, useState } from 'react';

export default function useLockScroll () {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [])
}