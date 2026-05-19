import React, { useState, useEffect } from "react";
import movieDataService from "../../services/movies";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
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
  const [reviewError, setReviewError] = useState("");

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

  const reviews = movie.reviews || [];
  const formatReviewDate = (date) => {
    const reviewDate = moment(date);
    return reviewDate.isValid() ? reviewDate.format("DD/MM/YYYY HH:mm") : "";
  };

  const canModifyReview = (reviewItem) => {
    return props.user && String(reviewItem.user_id) === String(props.user.id);
  };

  const deleteReview = (reviewId, index) => {
    setReviewError("");

    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    movieDataService
      .deleteReview(reviewId, props.user.id)
      .then((response) => {
        if (response.data.error) {
          setReviewError("You can only delete your own reviews.");
          return;
        }

        setMovie((currentMovie) => {
          const reviews = [...currentMovie.reviews];
          reviews.splice(index, 1);

          return {
            ...currentMovie,
            reviews,
          };
        });
      })
      .catch((e) => {
        console.log(e);
        setReviewError("Something went wrong while deleting the review.");
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} alt={movie.title} fluid />
          </Col>
          <Col>
            <Card className="mb-3">
              <Card.Header>{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Reviews</Card.Header>
              <Card.Body>
                {reviewError && <p className="text-danger small">{reviewError}</p>}
                {reviews.length > 0 ? (
                  reviews.map((reviewItem, index) => (
                    <div className="border rounded p-2 mb-2" key={reviewItem._id}>
                      <div className="d-flex justify-content-between gap-2">
                        <p className="mb-2 small">{reviewItem.review}</p>
                        {canModifyReview(reviewItem) && (
                          <div className="d-flex gap-2">
                            <Button
                              as={Link}
                              size="sm"
                              variant="outline-primary"
                              to={`/movies/${id}/review`}
                              state={{ currentReview: reviewItem }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => deleteReview(reviewItem._id, index)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="mb-0 text-muted small">
                        {reviewItem.name || "Anonymous"}
                        {reviewItem.date &&
                          ` - ${formatReviewDate(reviewItem.date)}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="mb-0 small text-muted">No reviews yet.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
