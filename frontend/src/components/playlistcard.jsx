import "./style.css";
import React from "react";

export const PlaylistCard = ({ playlist, isSelected, handlePlaylistClick }) => {
  return (
    <div id={playlist.id} className="music">
      <div
        id={playlist.id}
        className={`music-content ${isSelected ? "active" : ""}`}
        onClick={() => handlePlaylistClick(playlist)}>
        <div id={playlist.id} className="image-wrapper">
          <img id={playlist.id} src={playlist.images[0]?.url} alt="Playlist cover" />
        </div>
        <div id={playlist.id} className="right">
          <span id={playlist.id} className="name">
            {playlist.name.length > 19 ? `${playlist.name.substring(0, 19)}...` : playlist.name}
          </span>
          <span id={playlist.id} className="songs">{playlist.tracks.total} tracks</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
