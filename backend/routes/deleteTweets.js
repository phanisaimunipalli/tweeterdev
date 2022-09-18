// const express = require("express");
const { Client, auth } = require("twitter-api-sdk");
const dotenv = require("dotenv");
dotenv.config();
const router = require("express").Router();
// const app = express();

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: `${process.env.URL}:${process.env.PORT}/callback`,
  scopes: ["users.read", "tweet.read", "tweet.write"],
});
const client = new Client(authClient);

const STATE = "my-state";

router.get("/", async (req, res) => {
  console.log("inside delete tweets");
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  console.log(authUrl);
  res.redirect(authUrl);

  router.get("/callback", async function (req, res) {
    try {
      const { code, state } = req.query;
      if (state !== STATE) return res.status(500).send("State isn't matching");
      await authClient.requestAccessToken(code);
      res.redirect("/deleteTweet");
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/revoke", async function (req, res) {
    try {
      const response = await authClient.revokeAccessToken();
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/deleteTweet", async function (req, res) {
    try {
      const response = await client.tweets.deleteTweetById(req.headers.id);

      console.log("response", JSON.stringify(response, null, 2));
      res.send(response);
    } catch (error) {
      console.log("tweets error", error);
    }
  });
});

// app.listen(process.env.PORT, () => {
//   console.log(`Go here to login: ${process.env.URL}:${process.env.PORT}`);
// });
module.exports = router;
