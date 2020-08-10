const express = require("express");
const bodyParser = require("body-parser");
//mongo "mongodb+srv://cluster0-cmdxw.mongodb.net/meanangular" --username admin
// npm run start:server
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:brandon123@cluster0-cmdxw.mongodb.net/meanangular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect to database.");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
// can also use bodyParser.urlencoded .....

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next(); //its important to call next if not sending a response
// });

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //console.log(post);

  post.save().then((createdPost) => {
    //console.log(result);
    res.status(201).json({
      message: "post added successfully",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });

  //Commented out now that database has been added
  // const posts = [
  //   {
  //     id: "fadef4234",
  //     title: "first ever server-side post",
  //     content: "This is coming from the server",
  //   },
  //   {
  //     id: "faeffw4234",
  //     title: "second server-side post",
  //     content: "This is  the second post coming from the server",
  //   },
  // ];
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = app;
