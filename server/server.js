import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

//PORT set up
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//root route set up 
app.get("/", (request, response) => {
    response.json({ message: "Welcome to the server. GET comfy!"});
});

//READ (GET) data from table
app.get("/user-reviews", async (request, response) => {
    const query = await db.query(`SELECT * FROM user_reviews`);
    response.json(query.rows);
});

//CREATE (POST) new data
app.post("/add-user-reviews", (request, response) => {
    const newUserReview = request.body; 
    const query = db.query(`INSERT INTO user-reviews(movie_id, hot_takes, rating)`, 
        [newUserReview.movie_id, newUserReview.hot_takes, newUserReview.rating]
    );
    response.json("Data sent", query);
});
