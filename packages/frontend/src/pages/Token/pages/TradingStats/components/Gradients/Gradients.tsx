import React from 'react';

export const Gradients = () => {
  return (
    <defs>
      <linearGradient id="colorful" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.5%" stopColor="#27E65C" />
        <stop offset="50.22%" stopColor="#587BFF" />
        <stop offset="97.9%" stopColor="#B518FF" />
      </linearGradient>
      <linearGradient id="orangeStroke">
        <stop offset="0%" stopColor="#E79900" />
        <stop offset="50%" stopColor="#CEB300" />
        <stop offset="100%" stopColor="#CAB600" />
      </linearGradient>
      <linearGradient id="orangeFill">
        <stop offset="0.5%" stopColor="#E76F00" />
        <stop offset="97.9%" stopColor="#FF782D" />
      </linearGradient>
      <linearGradient id="barBlue">
        <stop offset="0.5%" stopColor="rgba(57, 208, 255, 0.5)" />
        <stop offset="97.9%" stopColor="rgba(131, 255, 248, 0.5)" />
      </linearGradient>
      <linearGradient id="barBlueActive">
        <stop offset="0.5%" stopColor="#39D0FF" />
        <stop offset="97.9%" stopColor="#83FFF8" />
      </linearGradient>
    </defs>
  );
};
