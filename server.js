// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const reactViews = require("express-react-views");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

// Set up route for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      // useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

const serviceRequestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  time: String,
  notes: String,
  service: String,
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

app.get("/admin", async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({
      date: 1,
      time: 1,
    });
    res.render("admin", { requests });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/servicerequest", async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Create a new service request object with the form data
  const serviceRequest = new ServiceRequest({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    service: req.body.service,
    date: req.body.date,
    time: req.body.time,
    notes: req.body.notes,
  });

  // Save the service request to the database
  try {
    await serviceRequest.save();

    // Send an email response to the user with their form details
    const mailOptions = {
      from: testAccount.user,
      to: req.body.email,
      subject: "Service Request Submitted",
      html: `
        <p>Thank you for submitting a service request!</p>
        <p>Here are the details you submitted:</p>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Email: ${req.body.email}</li>
          <li>Service: ${req.body.service}</li>
          <li>Date: ${req.body.date}</li>
          <li>Time: ${req.body.time}</li>
          <li>Notes: ${req.body.notes}</li>
        </ul>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // Render the index page with a success message
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.errored(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
