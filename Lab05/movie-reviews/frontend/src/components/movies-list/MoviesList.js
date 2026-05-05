import { React, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../../services/movies";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState([]);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, [searchTitle, searchRating]);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    find(searchTitle, "title");
  }
  const findByRating = () => {
    if (searchRating === "AllRatings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };
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
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          <button onClick={findByRating}>Search</button>
        </div>

      </div>
      <Row xs={1} md={3} className="g-3 mt-3">
        {movies.map((movie) => (
          <Col key={movie.id}>
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
    </div>
  );
};

export default MoviesList;