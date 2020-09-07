import React from 'react';
import {
  SearchPhraseField,
  ReplacePhraseField,
  Column,
  Row,
  Button,
  SearchResultContainer,
  SearchResultTitle,
  SearchResultSnippet,
  LoadingNote
} from './components';
import { useIsElementHovered, useDebouncedSearch } from './hooks';
import { makeStyles, Typography, List } from '@material-ui/core';
import { replaceSearchResultSnippetMatch, replace } from './utils';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(2),
    maxWidth: 750
  },
  searchButton: {
    margin: theme.spacing(0, 1)
  },
  buttonsContainer: {
    width: 'auto',
    '& > *': {
      margin: theme.spacing(0, 1)
    }
  },
  row: {
    margin: theme.spacing(1.5, 0)
  }
}));

const replaceFirstHighlightedMatch = (searchResults, newMatch) => {
  const replaceResultIndex = searchResults.findIndex((result) =>
    result.snippet.includes('<span class="searchmatch">')
  );

  if (replaceResultIndex < 0) {
    return searchResults;
  }

  const currentResult = searchResults[replaceResultIndex];

  const updatedResult = {
    ...currentResult,
    snippet: replaceSearchResultSnippetMatch(currentResult.snippet, newMatch)
  }

  return replace(searchResults, updatedResult, replaceResultIndex);
};

const replaceAllMatches = (searchResults, newMatch) => searchResults.map((result) => ({
  ...result,
  snippet: replaceSearchResultSnippetMatch(result.snippet, newMatch)
}));

export const Main = () => {
  const classes = useStyles();

  const {
    isFetching,
    searchQuery,
    searchResults,
    setSearchQuery,
    setSearchResults,
    runSearchFlush
  } = useDebouncedSearch();

  const [replaceQuery, setReplaceQuery] = React.useState('');

  const {
    hovered: hoveredReplace,
    onMouseOver: onMouseOverReplace,
    onMouseLeave: onMouseLeaveReplace
  } = useIsElementHovered();

  const {
    hovered: hoveredReplaceAll,
    onMouseOver: onMouseOverReplaceAll,
    onMouseLeave: onMouseLeaveReplaceAll
  } = useIsElementHovered();

  const handleReplaceHighlightPhrase = React.useCallback((replacePhrase, replaceAll) => () => {
    const updateSearchResultsFunc = replaceAll ? replaceAllMatches : replaceFirstHighlightedMatch;
    setSearchResults((searchResults) => updateSearchResultsFunc(searchResults, replacePhrase));
    replaceAll && setReplaceQuery('');
  }, [setSearchResults, setReplaceQuery]);

  const disableReplaceField = isFetching || !searchQuery || !searchResults || !searchResults.length === 0;
  const disableReplaceButtons = disableReplaceField || !replaceQuery;

  return (
    <main className={classes.main}>
      <Column>
        <Row className={classes.row}>
          <SearchPhraseField
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <Button
            disabled={isFetching || !searchQuery}
            onClick={runSearchFlush}
            className={classes.searchButton}
          >
            Search
          </Button>
        </Row>
        <Row className={classes.row}>
          <ReplacePhraseField
            disabled={disableReplaceField}
            value={replaceQuery}
            onChange={setReplaceQuery}
          />
          <Row className={classes.buttonsContainer}>
            <Button
              disabled={disableReplaceButtons}
              onClick={handleReplaceHighlightPhrase(replaceQuery, false)}
              onMouseOver={onMouseOverReplace}
              onMouseLeave={onMouseLeaveReplace}
              variant="outlined"
            >
              Replace
            </Button>
            <Button
              variant="outlined"
              disabled={disableReplaceButtons}
              onClick={handleReplaceHighlightPhrase(replaceQuery, true)}
              onMouseOver={onMouseOverReplaceAll}
              onMouseLeave={onMouseLeaveReplaceAll}
            >
              Replace all
            </Button>
          </Row>
        </Row>
      </Column>
      {isFetching && (
        <LoadingNote />
      )}
      {searchResults && searchResults.length > 0 && (
        <List>
          {searchResults.map((result, index) => (
            <SearchResultContainer
              key={result.title}
              replaceWithValue={replaceQuery}
              showReplaceWithValueHighlight={(index === 0 && hoveredReplace) || hoveredReplaceAll}
            >
              <SearchResultTitle>
                {result.title}
              </SearchResultTitle>
              <SearchResultSnippet>
                {result.snippet}
              </SearchResultSnippet>
            </SearchResultContainer>
          ))}
        </List>
      )}
      {searchResults && searchResults.length === 0 && (
        <Typography>
          No results for your search query.
        </Typography>
      )}
    </main>
  )
}
