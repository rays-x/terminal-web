// hook from https://usehooks.com/useOnClickOutside/
import React from 'react';

const useOnClickOutside = (ref, handler) => {
  React.useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) return;
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, // eslint-disable-next-line
    [ref, handler],
  );
};
export default useOnClickOutside;
