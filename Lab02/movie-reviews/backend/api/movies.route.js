const express = require("express");
const router = express.Router();
const moviesController = require("./movies.controller");

router.get("/", moviesController.apiGetMovies);

module.exports = router;
