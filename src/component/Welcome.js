import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Added by BHarat
class Welcome extends Component {
  state = {
    queries: "",
    tweets: [],
  };

  componentDidMount() {
    this.setState({
      queries: "",
      tweets: [],
    });
  }
  tweetify = () => toast("Tweeted!");
  deleteify = () => toast("Deleted!");

  handleTweet = (text) => {
    const req_header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
        text: text,
      },
    };
    axios.get("http://localhost:5000/tweet", req_header).then((res) => {
      console.log(res);
      {
        this.tweetify();
      }
    });
  };

  handleDelete = (id) => {
    const req_header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
        id: id,
      },
    };
    axios
      .get("https://tweeterdev.vercel.app/delete", req_header)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3000";
        {
          this.deleteify();
        }
      });
  };

  handleSearch = (query) => {
    const req_header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
        query: query,
      },
    };
    axios.get("http://localhost:5000/search", req_header).then((res) => {
      //   var data = res.data.data.statuses;
      console.log(res.data);
      this.setState({
        tweets: res.data.data,
      });
    });
  };

  renderTweets() {
    return this.state.tweets.map((tweet) => {
      console.log(tweet.text);
      return (
        <div style={{ marginTop: "1%" }}>
          <div
            style={{
              marginTop: "2px",
              border: "1px solid",
              width: "500px",
              height: "100px",
              marginLeft: "35%",
            }}
          >
            {tweet.text}

            <button
              type="button"
              class="btn btn-danger"
              style={{ position: "relative", float: "right", margin: "auto" }}
              onClick={() => this.handleDelete(tweet.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Twitter Maverick Assignment </h2>
        <ToastContainer />
        <div style={{ marginLeft: "30%", marginTop: "5%", marginBottom: "2%" }}>
          <input
            class="form-control"
            type="text"
            placeholder="Enter Text to Search/Tweet"
            aria-label="Search"
            style={{ width: "40%", float: "left" }}
            onChange={(event) => {
              this.setState({
                queries: event.target.value,
                type: true,
              });
            }}
          />
          <button
            type="button"
            class="btn btn-dark"
            style={{ float: "left", marginLeft: "2%" }}
            onClick={() => this.handleSearch(this.state.queries)}
          >
            Search
          </button>
          <button
            type="button"
            class="btn btn-dark"
            style={{ float: "left", marginLeft: "2%" }}
            onClick={() => this.handleTweet(this.state.queries)}
          >
            Tweet
          </button>
          <br />
          <br />
        </div>
        {this.renderTweets(this.state.tweets)}
      </div>
    );
  }
}

export default Welcome;
