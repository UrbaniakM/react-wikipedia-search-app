export const replaceSearchResultSnippetMatch = (snippet, newMatch) => (
  snippet.replaceAll(
    /<span class="searchmatch">.+<\/span>/gm,
    `<span class="searchmatch">${newMatch}</span>`
  )
)