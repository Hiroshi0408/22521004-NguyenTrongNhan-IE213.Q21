const MovieDAO = require("../dao/moviesDAO");

// [GET] /api/v1/movies
module.exports.apiGetMovies = async (req, res) => {
  const moviesPerPage = req.query.moviesPerPage
    ? parseInt(req.query.moviesPerPage)
    : 20;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  let filters = {};

  if (req.query.title) {
    filters.title = req.query.title;
  } else if (req.query.rated) {
    filters.rated = req.query.rated;
  }
  const { moviesList, totalNumMovies } = await MovieDAO.getMovies({
    filters,
    page,
    moviesPerPage,
  });

  let response = {
    movies: moviesList,
    page: page,
    filters: filters,
    entriesPerPage: moviesPerPage,
    total: totalNumMovies,
  };

  res.json(response);
};
