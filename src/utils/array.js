export const replace = (array, newElement, index) => [
  ...array.slice(0, index),
  newElement,
  ...array.slice(index + 1, array.length)
];