const useGenre = (selectedGenres, genres) => {
  let genreID = ""
  const genresTable = genres.reduce((acc, curr) => {
    acc[curr.name] = curr.id;
    return acc;
  }, {});
  selectedGenres.forEach((genre) => {
    if (Object.hasOwn(genresTable, genre)) {
       genreID +=  genresTable[genre]  + ","
    }
  });
  genreID = genreID.slice(0, -1)
  return genreID
};

export default useGenre;
