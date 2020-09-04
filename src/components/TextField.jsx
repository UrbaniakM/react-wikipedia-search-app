import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

export const TextField = ({ onChange, ...otherProps }) => {
  const handleChange = React.useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <MuiTextField
      onChange={handleChange}
      {...otherProps}
    />
  )
}