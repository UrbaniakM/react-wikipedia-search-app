import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';

export const Button = ({ variant, color, ...otherProps }) => (
  <MuiButton
    variant={variant || 'contained'}
    color={color || 'primary'}
    {...otherProps}
  />
)