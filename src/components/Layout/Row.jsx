import React from 'react';
import { Grid } from '@material-ui/core';

export const Row = (props) => (
  <Grid
    {...props}
    container
    direction="row"
  />
)