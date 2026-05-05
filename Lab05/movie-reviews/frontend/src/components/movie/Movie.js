import React, { useState, useEffect } from "react";
import movieDataService from "../../services/movies";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });
  const getMovie = (id) => {
    movieDataService
      .get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getMovie(id);
  }, [id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} alt={movie.title} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header>{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
                <br />
                <h2>Reviews</h2>
                {movie.reviews.map((review, index) => (
                  <div key={index} className="d-flex mb-3">
                    <div className="flex-grow-1">
                      <h5>
                        {review.name + " reviewed on "} {moment(review.date).format("MM/DD/YYYY")}
                      </h5>
                      <p>{review.review}</p>
                      {props.user && props.user.id === review.user_id && (
                        <Row>
                          <Col>
                            <Link
                              to={{
                                pathname:
                                  "/movies/" +
                                  id +
                                  "/review",
                                state: { currentReview: review },
                              }}
                            >
                              Edit
                            </Link>
                          </Col>
                          <Col><Button variant="danger">Delete</Button></Col>
                        </Row>
                      )}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
