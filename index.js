import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express()
const URL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async(req, res) => {
    try {
        const response = await axios.get(URL);
        const result = response.data
        console.log(result);
        res.render("index.ejs", {
          data: result
        });
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
});

app.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const { category, blacklistFlags, JokeType } = req.body;
        const response = await axios.get(` https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${blacklistFlags}&type=${JokeType}`);
                                         
        res.render("index.ejs", {
            data: response.data, 
        });
    }
    catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No activities that match your criteria.",
        });
      }
});

app.listen(port, () =>{
    console.log(`Server is running on port${port}`);
});