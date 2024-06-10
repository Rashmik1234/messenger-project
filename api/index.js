const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors({
  origin: '*', // You can specify a specific origin instead of '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://kulkarnirashmi900:azr28YD86z1cu1sh@rashmik.mxqxm7b.mongodb.net/Test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const User = require("./models/user");

app.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  const { name, email, password, image } = req.body;

  try {
    if (!name || !email || !password || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ name, email, password, image });

    const registeredUser = await newUser.save();
    if (registeredUser) {
      res.status(200).json({ message: "User registered successfully!" });
    } else {
      res.status(400).json({ message: "User not registered" });
    }
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Error registering user" });
  }
});
app.post("/register", async (req, res) => {
  console.log("in index.js");
  const { name, email, password, image } = req.body;

  try {
    // Check if required fields are provided
    if (!name || !email || !password || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password, image });

    // Save the new user to the database and await the result
    const registeredUser = await newUser.save();

    // If save is successful, send a success response
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    // If an error occurs during save, catch it and send an error response
    console.error("Error registering user", error);
    res.status(500).json({ message: "Error registering user" });
  }
});
