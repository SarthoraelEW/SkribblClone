function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

exports.getColorFromPixel = (pixel) => {
  if (arrayEquals(pixel, [0, 0, 0, 0])) {
    return "White";
  }
  const color = [pixel[0], pixel[1], pixel[2]];
  if (arrayEquals(color, [255, 255, 255])) return "White";
  if (arrayEquals(color, [211, 211, 211])) return "LightGray";
  if (arrayEquals(color, [255, 0, 0])) return "Red";
  if (arrayEquals(color, [255, 127, 80])) return "Coral";
  if (arrayEquals(color, [255, 255, 0])) return "Yellow";
  if (arrayEquals(color, [50, 205, 50])) return "LimeGreen";
  if (arrayEquals(color, [0, 191, 255])) return "DeepSkyBlue";
  if (arrayEquals(color, [0, 0, 255])) return "Blue";
  if (arrayEquals(color, [148, 0, 211])) return "DarkViolet";
  if (arrayEquals(color, [255, 182, 193])) return "LightPink";
  if (arrayEquals(color, [160, 82, 45])) return "Sienna";
  if (arrayEquals(color, [0, 0, 0])) return "Black";
  if (arrayEquals(color, [47, 79, 79])) return "DarkSlateGrey";
  if (arrayEquals(color, [139, 0, 0])) return "DarkRed";
  if (arrayEquals(color, [178, 34, 34])) return "FireBrick";
  if (arrayEquals(color, [255, 165, 0])) return "Orange";
  if (arrayEquals(color, [0, 100, 0])) return "DarkGreen";
  if (arrayEquals(color, [65, 105, 225])) return "RoyalBlue";
  if (arrayEquals(color, [0, 0, 139])) return "DarkBlue";
  if (arrayEquals(color, [139, 0, 139])) return "DarkMagenta";
  if (arrayEquals(color, [219, 112, 147])) return "PaleVioletRed";
  if (arrayEquals(color, [139, 69, 19])) return "SaddleBrown";
};

exports.getPixelFromColor = (color) => {
  switch (color) {
    case "White":
      return [255, 255, 255, 255];
    case "LightGray":
      return [211, 211, 211, 255];
    case "Red":
      return [255, 0, 0, 255];
    case "Coral":
      return [255, 127, 80, 255];
    case "Yellow":
      return [255, 255, 0, 255];
    case "LimeGreen":
      return [50, 205, 50, 255];
    case "DeepSkyBlue":
      return [0, 191, 255, 255];
    case "Blue":
      return [0, 0, 255, 255];
    case "DarkViolet":
      return [148, 0, 211, 255];
    case "LightPink":
      return [255, 182, 193, 255];
    case "Sienna":
      return [160, 82, 45, 255];
    case "Black":
      return [0, 0, 0, 255];
    case "DarkSlateGrey":
      return [47, 79, 79, 255];
    case "DarkRed":
      return [139, 0, 0, 255];
    case "FireBrick":
      return [178, 34, 34, 255];
    case "Orange":
      return [255, 165, 0, 255];
    case "DarkGreen":
      return [0, 100, 0, 255];
    case "RoyalBlue":
      return [65, 105, 225, 255];
    case "DarkBlue":
      return [0, 0, 139, 255];
    case "DarkMagenta":
      return [139, 0, 139, 255];
    case "PaleVioletRed":
      return [219, 112, 147, 255];
    case "SaddleBrown":
      return [139, 69, 19, 255];
    default:
      return [0, 0, 0, 255];
  }
};
