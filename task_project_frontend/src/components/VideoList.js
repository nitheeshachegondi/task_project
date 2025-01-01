import React from "react";

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.slice(0, 5).map((video) => (
        <div key={video.id} className="video-item">
          <img
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.title}
          />
          <p>{video.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
