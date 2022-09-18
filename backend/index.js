var express = require("express");
var path = require("path");
var cors = require("cors");
// const postTweetRouter = require("./routes/postTweets");
var deleteTweetRouter = require("./routes/deleteTweets");

var index = require("./routes/Routes");

var app = express();

var corsOptions = {
  origin: "https://tweeterdev.vercel.app/",
  credentials: true,
  optionsSuccessStatus: 200,
};

// app.use("/postTweet", postTweetRouter);
app.use("/delete", deleteTweetRouter);

app.use(cors(corsOptions));
app.use("/", index);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

module.exports = app;
