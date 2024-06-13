const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user"); // Ensure this path is correct

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

app.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  const { name, email, password, image } = req.body;

  try {
    if (!name || !email || !password || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ name, email, password, image });

    const registeredUser = await newUser.save();
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, "hwjhbakjbksu", { expiresIn: "1h" });
  return token;
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await  User.findOne({ email: email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ message:"Login successful" });
  } catch (error) {
    console.log("Error in finding user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
