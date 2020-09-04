import React from 'react';
import { Grid } from '@material-ui/core';

export const Column = (props) => (
  <Grid
    {...props}
    container
    direction="column"
  />
)