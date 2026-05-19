import { React, useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../../services/movies";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("AllRatings");
  const [titleSearch, setTitleSearch] = useState("");
  const [ratingSearch, setRatingSearch] = useState("AllRatings");
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }

  const updateMovieList = useCallback((response) => {
    console.log(response.data);
    setMovies(response.data.movies);
    setCurrentPage(response.data.page);
    setEntriesPerPage(response.data.entriesPerPage);
    setTotalResults(response.data.total);
  }, []);

  const getAllMovies = useCallback((page) => {
    setIsLoading(true);
    MovieDataService.getAll(page)
      .then(updateMovieList)
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateMovieList]);

  const find = useCallback((query, by, page) => {
    setIsLoading(true);
    MovieDataService.find(query, by, page)
      .then(updateMovieList)
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateMovieList]);

  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByTitle") {
      find(titleSearch, "title", currentPage);
    } else if (currentSearchMode === "findByRating") {
      find(ratingSearch, "rated", currentPage);
    } else {
      getAllMovies(currentPage);
    }
  }, [
    currentPage,
    currentSearchMode,
    find,
    getAllMovies,
    ratingSearch,
    titleSearch,
  ]);

  useEffect(() => {
    retrieveRatings();
  }, []);

  useEffect(() => {
    retrieveNextPage();
  }, [retrieveNextPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveMovies = () => {
    setCurrentSearchMode("");
    setTitleSearch("");
    setRatingSearch("AllRatings");

    if (currentPage === 0) {
      getAllMovies(0);
    } else {
      setCurrentPage(0);
    }
  };

  const findByTitle = () => {
    if (!searchTitle.trim()) {
      retrieveMovies();
      return;
    }

    setCurrentSearchMode("findByTitle");
    setTitleSearch(searchTitle);

    if (currentPage === 0) {
      find(searchTitle, "title", 0);
    } else {
      setCurrentPage(0);
    }
  }

  const findByRating = () => {
    if (searchRating === "AllRatings" || searchRating === "") {
      retrieveMovies();
    } else {
      setCurrentSearchMode("findByRating");
      setRatingSearch(searchRating);

      if (currentPage === 0) {
        find(searchRating, "rated", 0);
      } else {
        setCurrentPage(0);
      }
    }
  };

  const retrievePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const retrieveNextPageButton = () => {
    if ((currentPage + 1) * entriesPerPage < totalResults) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = entriesPerPage
    ? Math.ceil(totalResults / entriesPerPage)
    : 0;
  const canGoPrevious = currentPage > 0;
  const canGoNext = (currentPage + 1) * entriesPerPage < totalResults;

  return (
    <div className="movies-wrapper">
      <div className="search-row">

        <div className="search-group">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <button onClick={findByTitle}>Search</button>
        </div>

        <div className="search-group">
          <select onChange={onChangeSearchRating} value={searchRating}>
            <option value="AllRatings">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          <button onClick={findByRating}>Search</button>
        </div>

      </div>
      <Row xs={1} md={3} className="g-3 mt-3">
        {movies.map((movie) => (
          <Col key={movie._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={movie.poster + "/100px180"} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Rating: {movie.rated}</Card.Text>
                <Card.Text>{movie.plot}</Card.Text>
                <Link to={"/movies/" + movie._id}>View Reviews</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination-row">
        <button onClick={retrievePreviousPage} disabled={!canGoPrevious || isLoading}>
          Previous
        </button>
        <span>
          Page {totalPages > 0 ? currentPage + 1 : 0} of {totalPages}
        </span>
        <button onClick={retrieveNextPageButton} disabled={!canGoNext || isLoading}>
          Next
        </button>
      </div>
      <p className="results-summary">
        Showing {movies.length} of {totalResults} movies
      </p>
    </div>
  );
};

export default MoviesList;
