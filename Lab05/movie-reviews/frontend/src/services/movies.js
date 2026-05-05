import axios from "axios";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
  }
  get(id) {
    return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
  }
  find(query, by = "title", page = 0) {
    return axios.get(
      `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
    );
  }
  createReview(data) {
    return axios.post(`http://localhost:5000/api/v1/movies/reviews`, data);
  }
  updateReview(id, data) {
    return axios.put(`http://localhost:5000/api/v1/movies/reviews/${id}`, data);
  }
  deleteReview(id, userId) {
    return axios.delete(`http://localhost:5000/api/v1/movies/reviews`, { data: { review_id: id, user_id: userId } });
  }
  getRatings() {
    return axios.get(`http://localhost:5000/api/v1/movies/ratings`);
  }
}

const movieDataService = new MovieDataService();
export default movieDataService;