import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Movie from "./components/movie/Movie";
import Login from "./components/login/Login";
import MoviesList from "./components/movies-list/MoviesList";
import AddReview from "./components/add-review/AddReview";
import mockUser from "./mock-data/user";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    if (!user) {
      setUser(mockUser);
    } else {
      setUser(null);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={user ? "/" : "/login"}
                onClick={handleLogin}
              >
                {user ? "Logout" : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:id" element={<Movie user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
