import { useLayoutEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowWidth;
};

export enum Adaptive {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl'
}

interface UseAdaptiveTriggersProps {
  onExtraSmallEnter?: () => void;
  onSmallEnter?: () => void;
  onMediumEnter?: () => void;
  onLargeEnter?: () => void;
  onExtraLargeEnter?: () => void;
}

export const useAdaptiveTriggers = ({
  onExtraSmallEnter,
  onSmallEnter,
  onMediumEnter,
  onLargeEnter,
  onExtraLargeEnter
}: UseAdaptiveTriggersProps={}) => {
  const [width, setWidth] = useState<Adaptive>(Adaptive.xl);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (document.activeElement?.tagName.toLowerCase() === 'input') {
        return;
      }
      if (window?.innerWidth < 768) {
        onExtraSmallEnter?.();
        if (window?.innerHeight < 700) {
          return setWidth(Adaptive.xxs);
        }
        return setWidth(Adaptive.xs);
      }
      if (window?.innerWidth < 1120) {
        onSmallEnter?.();
        return setWidth(Adaptive.s);
      }
      if (window?.innerWidth < 1280) {
        onMediumEnter?.();
        return setWidth(Adaptive.m);
      }
      if (window?.innerWidth < 1440) {
        onLargeEnter?.();
        return setWidth(Adaptive.l);
      }
      onExtraLargeEnter?.();
      if (window?.innerHeight < 900) {
        return setWidth(Adaptive.xl);
      }
      return setWidth(Adaptive.xxl);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [
    onSmallEnter,
    onMediumEnter,
    onLargeEnter,
    onExtraLargeEnter,
    onExtraSmallEnter
  ]);
  return {
    width,
    isDesktop: width !== Adaptive.s && width !== Adaptive.xs && width !== Adaptive.xxs,
    isMobile: width === Adaptive.xs || width === Adaptive.xxs || width === Adaptive.s,
  };
};
