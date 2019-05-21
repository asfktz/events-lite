import { useMediaLayout } from 'use-media';
import { breakpoints } from '../CONSTANTS';

export default function useBreakpoints() {
  const mq = {
    md: useMediaLayout({ minWidth: breakpoints.md }),
  };

  return mq;
}
