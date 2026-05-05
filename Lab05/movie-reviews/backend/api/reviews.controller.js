const ReviewsDAO = require("../dao/reviewsDAO");

// [POST] /api/v1/movies/reviews
module.exports.apiPostReview = async (req, res) => {
  const { movie_id, review, userinfo } = req.body;

  try {
    const result = await ReviewsDAO.addReview(
      movie_id,
      review,
      userinfo.user_id,
      userinfo.name,
    );
    res.json({ success: "success", result });
  } catch (error) {
    console.log("Error: ", error);
  }
};

// [PUT] /api/v1/movies/reviews/:id
module.exports.apiUpdateReview = async (req, res) => {
  const review_id = req.params;
  const { review, user_id } = req.body;
  const existingReview = await ReviewsDAO.getReview(review_id);

  if (!existingReview) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (existingReview.user_id !== user_id) {
    return res.json({ error: "error" });
  }

  try {
    const result = await ReviewsDAO.updateReview(review_id, review);
    res.json({ success: "success", result });
  } catch (error) {
    console.log("Unable to update Review");
  }
};

// [DELETE] /api/v1/movies/reviews/:id
module.exports.apiDeleteReview = async (req, res) => {
  const review_id = req.params;
  const { user_id } = req.body;
  const existingReview = await ReviewsDAO.getReview(review_id);

  if (!existingReview) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (existingReview.user_id !== user_id) {
    return res.json({ error: "error" });
  }

  try {
    const result = await ReviewsDAO.deleteReview(review_id);
    res.json({ success: "success", result });
  } catch (error) {
    console.log("Unable to update Review");
  }
};
