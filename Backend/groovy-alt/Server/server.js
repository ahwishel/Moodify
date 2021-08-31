const express = require("express");
const axios = require("axios");

const API_KEY = "AIzaSyBPmgGQv4T56ptJOXfGLsSYbI8xlY0dG8Q";
const PROD_API_KEY = "AIzaSyDG-BNRR2bFqQK12VXaTWAYc6hVIPwjxpU";
const baseYoutubeURL = "https://www.youtube.com/embed/";
const watchYoutubeURL = "https://www.youtube.com/watch?v=";
const app = express();
const cors = require("cors");

app.use(cors());

const port = 3001;

app.get("/:songQuery", (req, response) => {
  var regex = /\d+/g;
  var links = null;
  console.log(req.params.songQuery);
  axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        key: API_KEY,
        q: req.params.songQuery,
        type: "video",
      },
    })
    .then((res) => {
      // console.log(res.data);
      videoIds = []
      links = res.data.items.map(
        (videoObj) => {
          videoIds.push(videoObj.id.videoId)
          return watchYoutubeURL + videoObj.id.videoId + "?autoplay=1"
        }
      );
      // console.log(links);
      // console.log(videoIds)
      axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "contentDetails",
            key: API_KEY,
            id: videoIds.join(","),
          },
        })
        .then((detailsRes) => {
          // console.log(detailsRes.data.items);
          const durations = detailsRes.data.items.map(
            (item) => {
              let Min_Sec = item.contentDetails.duration.match(regex)
              const totalMS = (parseInt(Min_Sec[0]) * 60 * 1000) + (parseInt(Min_Sec[1]) * 1000)
              return totalMS
            }
          );
          console.log(videoIds,durations)
          response.json({ songLinks: links, vidDurations: durations });
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((e) => {
      console.error(e);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
