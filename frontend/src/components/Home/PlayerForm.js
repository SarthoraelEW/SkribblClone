import React, { useState } from "react";
import AvatarCustomization from "./AvatarCustomization";

const PlayerForm = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("English");

  return (
    <div className="player-form">
      <div className="player-form-container">
        <div className="inputs">
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <select
            id="language-select"
            className="form-control"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <AvatarCustomization />
        <button className="play-button btn btn-success btn-lg btn-block">Play!</button>
        <button className="create-room-button btn btn-info btn-block">Create Private Room</button>
      </div>
    </div>
  );
};

export default PlayerForm;
