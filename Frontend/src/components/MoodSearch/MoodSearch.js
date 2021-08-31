import "./MoodSearch.css";
import { useState } from "react";
import loadingGif from "./Ripple-1s-200px.gif";
import axios from "axios";
import GooeyComponent from "../GooeyComponent/GooeyComponent";

const MoodSearch = (props) => {
  const [moodEntry, setmoodEntry] = useState("");
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  const searchForVideos = (songQuery) => {
    setIsLoadingSong(true);
    axios
      .get(`http://localhost:3001/${songQuery}`)
      .then((response) => {
        console.log(response.data.vidDurations[0]);
        props.onSearch(response.data.songLinks);
        setIsLoadingSong(false);
        setIsPlayingSong(true);
        setTimeout(() => {
          console.log("setting isPlayingSong to False when done");
          setIsPlayingSong(false);
        }, response.data.vidDurations[0]); //show the search bar after song is done
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const findSongHandler = (event) => {
    searchForVideos(`${moodEntry} music`);
    setmoodEntry("");
  };

  const onTyping = (event) => {
    setmoodEntry(event.target.value);
  };

  if (isLoadingSong) {
    return (
      <div className="mood-search__container">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  } else if (isPlayingSong) {
    return (
      <div className="mood-search__container">
        <GooeyComponent />
      </div>
    );
  } else {
    return (
      <div className="mood-search__container">
        <input
          type="text"
          value={moodEntry}
          onChange={onTyping}
          placeholder="Type your mood | ex: peachy, sad, mellow, ..."
        />
        <div className="mood-search__submitBtn" onClick={findSongHandler}>
          <img
            className="search-icon"
            src="https://img.icons8.com/search"
            alt="Search Icon"
          />
        </div>
      </div>
    );
  }
};

export default MoodSearch;
