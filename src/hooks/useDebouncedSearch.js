import React from 'react';
import debounce from 'lodash.debounce';
import { useGetSearchWikiPhrase } from './useGetSearchWikiPhrase';

export const useDebouncedSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState();

  const { getSearchWikiPhrase, isFetching } = useGetSearchWikiPhrase();

  const handleWikiPhraseSearch = React.useCallback((phrase) => async () => {
    const searchResults = await getSearchWikiPhrase(phrase);
    setSearchResults(searchResults.query.search);
  }, [getSearchWikiPhrase, setSearchResults])

  const debouncedHandleWikiPhraseSearch = React.useCallback(
    debounce(handleWikiPhraseSearch(searchQuery), 1000),
    [searchQuery, handleWikiPhraseSearch]
  );

  const flushDebouncedHandleWikiPhraseSearch = React.useCallback(() => {
    debouncedHandleWikiPhraseSearch.flush();
  }, [debouncedHandleWikiPhraseSearch])

  React.useEffect(() => {
    searchQuery.length > 0 && debouncedHandleWikiPhraseSearch();

    // cleanup
    return () => debouncedHandleWikiPhraseSearch.cancel();
  }, [searchQuery, debouncedHandleWikiPhraseSearch]);

  return {
    isFetching,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    runSearchFlush: flushDebouncedHandleWikiPhraseSearch
  }
}