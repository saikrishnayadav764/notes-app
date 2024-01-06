require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const dbURI = process.env.DB_URI;

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Connecting to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api", notesRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
