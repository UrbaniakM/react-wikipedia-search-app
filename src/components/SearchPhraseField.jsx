import React from 'react';
import { TextField } from './TextField';

export const SearchPhraseField = ({ onChange, value }) => {
  return (
    <TextField 
      id="search-phrase"
      label="Search phrase"
      onChange={onChange}
      value={value}
      type="text"
    />
  );
}
