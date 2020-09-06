import React from 'react';
import { makeStyles, ListItem } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 0),
    '& .searchmatch': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    }
  },
  resultContainerReplaceQuery: ({ replaceWithValue }) => ({
    '& .searchmatch': {
      textDecoration: 'line-through',
      '&:after': {
        display: 'inline-block',
        textDecoration: 'none',
        content: `" ${replaceWithValue}"`,
        paddingLeft: theme.spacing(0.25),
        color: theme.palette.secondary.main
      }
    }
  })
}));

export const SearchResultContainer = ({ 
  children, 
  className, 
  replaceWithValue,
  showReplaceWithValueHighlight,
  ...otherProps 
}) => {
  const classes = useStyles({ replaceWithValue });

  return (
    <ListItem
      className={
        clsx(
          className,
          classes.resultContainer,
          replaceWithValue && showReplaceWithValueHighlight && classes.resultContainerReplaceQuery
        )
      }
      {...otherProps}
      divider
    >
      {children}
    </ListItem>
  );
} 