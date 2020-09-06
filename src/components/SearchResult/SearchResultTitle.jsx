import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  resultTitle: {
    marginBottom: theme.spacing(1)
  }
}))

export const SearchResultTitle = ({ children, className, ...otherProps }) => {
  const classes = useStyles();

  return (
    <Typography
      className={clsx(className, classes.resultTitle)}
      variant="h6"
      {...otherProps}
    >
      {children}
    </Typography>
  );
} 