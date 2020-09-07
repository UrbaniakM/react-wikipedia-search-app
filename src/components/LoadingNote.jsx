import React from 'react';
import { makeStyles, Box, Typography, CircularProgress, Divider } from '@material-ui/core';
import { Row } from './Layout/Row';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    marginBottom: theme.spacing(1.5)
  },
  circularProgress: {
    marginLeft: theme.spacing(1.5)
  }
}));

export const LoadingNote = () => {
  const classes = useStyles();

  return (
    <Box>
      <Row alignItems="center" className={classes.loadingContainer}>
        <Typography>
          Loading, please wait ...
      </Typography>
        <CircularProgress className={classes.circularProgress} />
      </Row>
      <Divider />
    </Box>
  )
}