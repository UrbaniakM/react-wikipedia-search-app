import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

export const TextField = ({ 
  onChange, 
  variant, 
  value: valueProps, 
  ...otherProps 
}) => {
  const [value, setValue] = React.useState(valueProps);

  React.useEffect(() => {
    setValue(valueProps);
  }, [valueProps, setValue])

  const handleChange = React.useCallback((event) => {
    const newValue = event.target.value;

    setValue(newValue);
    onChange(newValue);
  }, [setValue, onChange]);

  return (
    <MuiTextField
      onChange={handleChange}
      variant={variant || 'outlined'}
      value={value}
      {...otherProps}
    />
  )
}