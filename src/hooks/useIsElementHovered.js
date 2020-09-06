import React from 'react';

export const useIsElementHovered = () => {
  const [hovered, setHovered] = React.useState(false);

  const setHoveredCallback = React.useCallback((isHovered) => () => {
    setHovered(isHovered);
  }, [setHovered]);

  return {
    hovered,
    onMouseOver: setHoveredCallback(true),
    onMouseLeave: setHoveredCallback(false)
  }
}