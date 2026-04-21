import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Movie from "./components/movie/movie";
import Login from "./components/login/login";
import MoviesList from "./components/movies-list/movies-list";
import AddReview from "./components/add-review/add-review";
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
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/movies">Movies</Link>
              </Nav.Link>
              <Nav.Link>
                {user ? (
                  <Link to="/" onClick={handleLogin}>
                    Logout
                  </Link>
                ) : (
                  <Link to="/login" onClick={handleLogin}>
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:id/reviews" element={<AddReview />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
