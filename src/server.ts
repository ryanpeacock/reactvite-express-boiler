import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { OMDbResponse } from "./types/omdb";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "Development mode: Build the client to serve static files.",
    });
  });
}

app.get("/api/search-movies", async (req: Request, res: Response) => {
  const { search } = req.query;

  // Ensure the query parameter is provided
  if (!search || typeof search !== "string") {
    res.status(400).json({
      error: "Search query parameter is required and must be a string",
    });
    return;
  }

  try {
    // Call OMDb API
    const response = await axios.get<OMDbResponse>("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: search,
      },
    });

    // Check if API returned results
    if (response.data.Response === "False") {
      res.status(404).json({ error: response.data.Error });
      return;
    }

    // Send back the results
    res.json(
      response.data.Search?.map((item) => {
        return {
          label: item.Title,
          value: item.imdbID,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching data from OMDb API:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
