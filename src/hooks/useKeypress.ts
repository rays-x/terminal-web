// hook from https://usehooks.com/useKeyPress/
import React from 'react';

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);
  const downHandler = ({key}) => {
    if(key !== targetKey) return;
    setKeyPressed(true);
  };
  const upHandler = ({key}) => {
    if(key !== targetKey) return;
    setKeyPressed(false);
  };
  React.useEffect(
    () => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, // eslint-disable-next-line
    []
  );
  return keyPressed;
}

export default useKeyPress;
