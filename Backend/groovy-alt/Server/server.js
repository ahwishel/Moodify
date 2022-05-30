const express = require("express");
const axios = require("axios");
const watchYoutubeURL = "https://www.youtube.com/watch?v=";
const app = express();
const cors = require("cors");

app.use(cors());

const port = 3001;

app.get("/:songQuery", (req, response) => {
  var regex = /\d+/g;
  var links = null;
  axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        key: process.env.REACT_YOUTUBE_API_KEY,
        q: req.params.songQuery,
        type: "video",
      },
    })
    .then((res) => {
      videoIds = []
      links = res.data.items.map(
        (videoObj) => {
          videoIds.push(videoObj.id.videoId)
          return watchYoutubeURL + videoObj.id.videoId + "?autoplay=1"
        }
      );
      axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "contentDetails",
            key: process.env.REACT_YOUTUBE_API_KEY,
            id: videoIds.join(","),
          },
        })
        .then((detailsRes) => {
          const durations = detailsRes.data.items.map(
            (item) => {
              let Min_Sec = item.contentDetails.duration.match(regex)
              const totalMS = (parseInt(Min_Sec[0]) * 60 * 1000) + (parseInt(Min_Sec[1]) * 1000)
              return totalMS
            }
          );
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

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});
