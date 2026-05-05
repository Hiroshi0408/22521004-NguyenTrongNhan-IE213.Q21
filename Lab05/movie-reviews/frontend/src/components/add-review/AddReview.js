import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import movieDataService from "../../services/movies";

const AddReview = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  const editing = location.state?.currentReview;

  const [review, setReview] = useState(editing ? editing.review : "");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <Container className="mt-3">
        <p>Please login to add a review.</p>
        <Link to="/login">Login</Link>
      </Container>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const request = editing
      ? movieDataService.updateReview(editing._id, {
        review,
        user_id: user.id,
      })
      : movieDataService.createReview({
        movie_id: id,
        review,
        userinfo: { user_id: user.id, name: user.name },
      });

    request
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setSubmitted(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setError("Something went wrong.");
      });
  };

  return (
    <Container className="mt-3">
      {submitted ? (
        <div>
          <h4>Review {editing ? "updated" : "submitted"} successfully.</h4>
          <Link to={`/movies/${id}`}>Back to movie</Link>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{editing ? "Edit" : "Add"} Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default AddReview;
