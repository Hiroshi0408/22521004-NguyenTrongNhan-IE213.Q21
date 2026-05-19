const express = require("express");
const router = express.Router();
const moviesController = require("./movies.controller");
const reviewsController = require("./reviews.controller");

router.get("/", moviesController.apiGetMovies);

router.post("/reviews", reviewsController.apiPostReview);
router.put("/reviews/:id", reviewsController.apiUpdateReview);
router.delete("/reviews/:id", reviewsController.apiDeleteReview);

router.get("/id/:id", moviesController.apiGetMovieById);
router.get("/ratings", moviesController.apiGetRatings);
module.exports = router;
