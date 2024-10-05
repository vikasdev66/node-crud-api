const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoutes = require("./routes/product.route.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables from .env
dotenv.config();

// app.use(express.json()); is a middleware function in an Express.js application that allows the server to parse incoming JSON request bodies.
//     app.use(): This function is used to apply middleware to your Express app.
//     express.json(): This built-in middleware parses incoming requests with JSON payloads, making the parsed data available in req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from node API server");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@nodedb.occy2.mongodb.net/Node-API?retryWrites=true&w=majority&appName=nodeDB`
  )
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.LOCAL_PORT, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Database connection failed!", error);
  });

module.exports = app;
