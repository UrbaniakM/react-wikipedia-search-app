import React from 'react';
import { TextField } from './TextField';

export const SearchPhraseField = ({ onChange }) => {
  return (
    <TextField 
      id="search-phrase"
      label="Search phrase"
      onChange={onChange}
    />
  );
}
