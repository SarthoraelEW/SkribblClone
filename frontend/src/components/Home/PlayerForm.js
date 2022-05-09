import React, { useContext, useEffect, useState } from "react";
import AvatarCustomization from "./AvatarCustomization";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../AppContext";

const PlayerForm = () => {
  const socket = useContext(SocketContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("English");
  const [room, setRoom] = useState("");

  const [color, setColor] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [eyes, setEyes] = useState(0);

  const createRoom = () => {
    if (username !== "") {
      socket.emit("create_room", {
        username: username,
        language: language,
        atlas: {color, mouth, eyes},
      });
    }
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {
        username: username,
        language: language,
        atlas: {color, mouth, eyes},
        token: room
      });
      navigate(`/private-room?room=${room}`);
    }
  };

  useEffect(() => {
    socket.on("generate_token", (data) => {
      navigate(`/private-room?room=${data.token}`);
    });
  });

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
        <AvatarCustomization
          color={color}
          setColor={setColor}
          mouth={mouth}
          setMouth={setMouth}
          eyes={eyes}
          setEyes={setEyes}
        />
        <button className="play-button btn btn-success btn-lg btn-block">
          Play!
        </button>
        <button
          className="create-room-button btn btn-info btn-block"
          onClick={createRoom}
        >
          Create Private Room
        </button>
        <br />
        <div className="joinRoomInput">
          <input
            type="text"
            name="room"
            id="room"
            className="form-control"
            placeholder="Enter room ID"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
          <button className="btn btn-info" onClick={joinRoom}>Join room</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
