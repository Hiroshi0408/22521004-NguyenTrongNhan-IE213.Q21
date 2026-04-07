const MoviesDAO = require("../dao/moviesDAO");

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

// [GET] /api/v1/movies/id/:id
module.exports.apiGetMovieById = async (req, res) => {
  const movie_id = req.params.id;
  try {
    const movie = await MoviesDAO.getMovieById(movie_id);

    if (!movie) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// [GET] /api/v1/movies/ratings
module.exports.apiGetRatings = async (req, res) => {
  try {
    const ratings = await MoviesDAO.getRatings();

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
