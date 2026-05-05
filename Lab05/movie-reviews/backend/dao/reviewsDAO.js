const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
let reviews;

class reviewDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to connect in ReviewsDAO: ${e}`);
    }
  }
  static async getReview(review_id) {
    const result = await reviews.findOne({ _id: new ObjectId(review_id) });
    console.log(result);
    return result;
  }
  static async addReview(movie_id, review, user_id, name) {
    let newReview = {
      movie_id: new ObjectId(movie_id),
      review,
      user_id,
      name,
      date: Date.now(),
    };

    try {
      const result = await reviews.insertOne(newReview);
      console.log("Successfully add review");

      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
  static async updateReview(review_id, review) {
    try {
      const result = await reviews.updateOne(
        { _id: new ObjectId(review_id) },
        { $set: { review: review, date: Date.now() } },
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error", error);
    }
  }
  static async deleteReview(review_id) {
    try {
      const result = await reviews.deleteOne({ _id: new ObjectId(review_id) });

      if (result.deletedCount === 0) {
        return res.json({ error: "Review not found" });
      }

      return result;
    } catch (error) {
      console.log("Error", error);
    }
  }
}

module.exports = reviewDAO;
