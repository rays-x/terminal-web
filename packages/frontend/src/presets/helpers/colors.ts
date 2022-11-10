export function hexToRgb(hex: string, opacity?: number): string {
  let r = '0',
    g = '0',
    b = '0';

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  const colorsString = `${+r}, ${+g}, ${+b}`;

  return opacity ? `rgba(${colorsString}, ${opacity})` : `rgb(${colorsString})`;
}

function rgbToHex(
  r: string | number,
  g: string | number,
  b: string | number
): string {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;

  return '#' + r + g + b;
}
