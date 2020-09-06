import React from 'react';
import { getSearchWikiPhrase } from '../api';

export const useGetSearchWikiPhrase = () => {
  const [isFetching, setIsFetching] = React.useState(false);

  const getSearchWikiPhraseCallback = React.useCallback((phrase) => {
    setIsFetching(true);
    return getSearchWikiPhrase(phrase)
      .then((response) => {
        return response;
      })
      .catch(() => {
        // needs error handling
      })
      .finally(() => {
        setIsFetching(false);
      })
  }, [setIsFetching]);

  return {
    isFetching,
    getSearchWikiPhrase: getSearchWikiPhraseCallback
  }
}