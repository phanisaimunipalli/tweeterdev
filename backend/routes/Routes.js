 var express = require('express');
//  var router = express.Router();
const config=require('./../config');
var Twit = require('twit');

var T = new Twit(config);

const {TwitterApi} = require('twitter-api-v2');
const twitterClient = new TwitterApi("AAAAAAAAAAAAAAAAAAAAAJw6hAEAAAAAsgCuFSkJX9GsNAktdbtce20yPng%3De18h5KV9uowXTdM0p9KA6Ze2ITkA7pkNgEXulFMkifOJHngDwG");
const router = require("express").Router();
const { Client, auth } = require("twitter-api-sdk");


const URL = process.env.URL || "localhost";
const PORT = process.env.PORT || 5000;
const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    callback: `${URL}:${PORT}/callback`,
    scopes: ["users.read", "tweet.read", "tweet.write"],
  });
  const client = new Client(authClient);
  const STATE = "my-state";

router.get("/search", async (req, r) => {
  const client = new Client("AAAAAAAAAAAAAAAAAAAAAJw6hAEAAAAAsgCuFSkJX9GsNAktdbtce20yPng%3De18h5KV9uowXTdM0p9KA6Ze2ITkA7pkNgEXulFMkifOJHngDwG");
  const res = await twitterClient.v2.userByUsername('maveric1303');
  var id = res.data.id
  const response = await client.tweets.usersIdTweets(id);
  console.log(response);
  r.send(response);
  return response
})

router.get("/", async (req, res) => {
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
      res.redirect("/delete");
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

  // router.get("/delete", async function (req, res) {
  //   try {
  //     const response = await client.tweets.deleteTweetById(req.headers.id);
  //   console.log("response", JSON.stringify(response, null, 2));
  //     res.send(response);
  //   } catch (error) {
  //     console.log("tweets error", error);
  //   }
  // });

});

// router.get("/delete", async function (req, res) {
//   console.log("delete inside");
//   const authUrl = authClient.generateAuthURL({
//     state: STATE,
//     code_challenge_method: "s256",
//   });
//   console.log(authUrl);
//   res.header('Access-Control-Allow-Origin', "*");
//   res.redirect(authUrl);

//   router.get("/callback", async function (req, res) {
//     try {
//       const { code, state } = req.query;
//       if (state !== STATE) return res.status(500).send("State isn't matching");
//       await authClient.requestAccessToken(code);
//       // res.redirect("/delete");

//       try {
//         const response = await client.tweets.deleteTweetById(req.headers.id);
//       console.log("response", JSON.stringify(response, null, 2));
//         res.send(response);
//       } catch (error) {
//         console.log("tweets error", error);
//       }


//     } catch (error) {
//       console.log(error);
//     }
//   });
  
//   try {
//     const response = await client.tweets.deleteTweetById(req.headers.id);
//   console.log("response", JSON.stringify(response, null, 2));
//     res.send(response);
//   } catch (error) {
//     console.log("tweets error", error);
//   }
// });


 //create tweet - Added by Manish
 router.get('/tweet', function(req, res, next) {
    //res.send('respond with a resource');
    T.post('statuses/update', {status:req.headers.text})
    .then(results => res.json(results))
    .catch(err => res.status(400).json("Error: " + err));

    alert("Tweeted");
});





// //delete api - Added by Bharat
// router.get('/delete',function(req,res,next){
//     console.log(req.headers)
//     T.post('statuses/destroy/:id', {id:req.headers.id}) 
//     .then(results => res.json(results))
//     .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;