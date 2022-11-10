import { SPG } from '../types';

export const enum Breakpoints {
  width = 'width'
}

export const breakpoints: SPG<Breakpoints> = {
  [Breakpoints.width]: {
    mobileMin: '320px',
    mobileMax: '1023px',
    tabletMin: '1024px',
    tabletMax: '1439px',
    desktopMin: '1440px',
    desktopMid: '1620px'
  }
};
