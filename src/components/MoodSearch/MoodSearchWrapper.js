import MoodSearch from "./MoodSearch";
import "./MoodSearchWrapper.css";
import React, { useState, useEffect, useRef } from "react";
// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ReactPlayer from "react-player/youtube";

const MoodSearchWrapper = (props) => {
  
  const [currentVideo, setCurrentVideo] = useState("");

  const [playList, setplayList] = useState([]);


  useEffect(() => {
    setCurrentVideo(playList[0]); //Have to put this here since it relies on setplayList
  }, [playList]); // only set the dependency to the value involved not the state being changed

  return (
    <div className="mood-search__wrapper">
      {/* <VideoPlayer source={currentVideo} /> */}
      <ReactPlayer style={{display:'none'}} playing={true} url={currentVideo}/>
      <MoodSearch onSearch={setplayList} />
    </div>
  );
};

export default MoodSearchWrapper;
