require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const spotifyRoutes = require("./routes/spotify");

app.use(cors());
app.use(express.json());

app.use("/api/spotify", spotifyRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
