import "./VideoPlayer.css";
// import {useEffect} from 'react';

const VideoPlayer = (props) => {

  return (
    <div className="video-container">
      <iframe
        className="player"
        width="0"
        height="0"
        src={props.source}
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
