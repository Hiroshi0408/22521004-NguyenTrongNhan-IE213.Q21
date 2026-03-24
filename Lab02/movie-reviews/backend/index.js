const app = require("./server");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const MoviewDAO = require("./dao/moviesDAO");

async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await MoviewDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main().catch(console.error);
