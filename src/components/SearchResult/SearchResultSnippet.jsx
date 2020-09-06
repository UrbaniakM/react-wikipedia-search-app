import React from 'react';
import { Typography } from '@material-ui/core';

export const SearchResultSnippet = ({ children, ...otherProps }) => (
  <Typography
    variant="body2"
    {...otherProps}
  >
    <div dangerouslySetInnerHTML={{ __html: children }} />
  </Typography>
);
