import React from 'react';
import {
  SearchPhraseField,
  ReplacePhraseField,
  Column,
  Row,
  Button,
  SearchResultContainer,
  SearchResultTitle,
  SearchResultSnippet
} from './components';
import { useGetSearchWikiPhrase } from './hooks';
import { makeStyles, Typography, List } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(2)
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

export const Main = () => {
  const classes = useStyles();

  const { getSearchWikiPhrase, isFetching } = useGetSearchWikiPhrase();
  const [searchResults, setSearchResults] = React.useState();

  const [searchQuery, setSearchQuery] = React.useState();
  const [replaceQuery, setReplaceQuery] = React.useState();

  const handleWikiPhraseSearch = React.useCallback((phrase) => async () => {
    const searchResults = await getSearchWikiPhrase(phrase);
    setSearchResults(searchResults.query.search);
  }, [getSearchWikiPhrase, setSearchResults])

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
            onClick={handleWikiPhraseSearch(searchQuery)}
            className={classes.searchButton}
          >
            Search
          </Button>
        </Row>
        <Row className={classes.row}>
          <ReplacePhraseField
            disabled={!searchQuery}
            value={replaceQuery}
            onChange={setReplaceQuery}
          />
          <Row className={classes.buttonsContainer}>
            <Button
              disabled={!replaceQuery || !searchQuery}
              variant="outlined"
            >
              Replace
            </Button>
            <Button
              variant="outlined"
              disabled={!replaceQuery || !searchQuery}
            >
              Replace all
            </Button>
          </Row>
        </Row>
      </Column>
      {searchResults && searchResults.length > 0 && (
        <List>
          {searchResults.map((result, index) => (
            <SearchResultContainer
              key={result.title}
              replaceWithValue={replaceQuery}
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
