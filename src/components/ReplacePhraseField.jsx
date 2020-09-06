import React from 'react';
import { TextField } from './TextField';

export const ReplacePhraseField = ({ onChange }) => {
  return (
    <TextField 
      id="replace-phrase"
      label="Replace with"
      onChange={onChange}
    />
  );
}
