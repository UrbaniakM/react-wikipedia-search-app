const API_URL = 'https://en.wikipedia.org/w/';

export const getSearchWikiPhrase = (phrase) =>
  fetch(`${API_URL}api.php?action=query&list=search&format=json&srsearch=%22${encodeURI(phrase)}%22&srlimit=10&origin=*`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response;
      }
    })