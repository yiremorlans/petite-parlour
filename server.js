// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving
app.use(express.static(path.join(__dirname, "public")));

// Set up route for the homepage
app.get("/", (req, res) => {
  console.log("Wecome to the homepage");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const serviceRequestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  time: String,
  notes: String,
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

app.post("/servicerequest", async (req, res) => {
  const newServiceRequest = new ServiceRequest(req.body);
  console.log(newServiceRequest);
  try {
    await newServiceRequest.save();
    res.status(200).json({ message: "Service request submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
