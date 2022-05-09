import React, { useContext, useState } from "react";
import { SocketContext } from "../AppContext";

const Settings = ({ room, token }) => {
  const socket = useContext(SocketContext);

  const [errorMessage, setErrorMessage] = useState("");

  const validCustomWords = (words) => {
    for (const i in words) {
      console.log(words[i]);
      if (words[i].length > 30) {
        return false;
      }
      if (words[i].split(" ").length > 4) {
        return false;
      }
    }
    return true;
  };

  const updateRoom = () => {
    socket.emit("update_room", {
      token: token,
      room: room,
    });
  };

  const updateRounds = (e) => {
    room.rounds = e.target.value;
    updateRoom();
  };

  const updateDrawTime = (e) => {
    room.drawTime = e.target.value;
    updateRoom();
  };

  const updateLanguage = (e) => {
    room.language = e.target.value;
    updateRoom();
  };

  const updateCustomWords = () => {
    const customWordsParsed = customWords.split(",");
    if (validCustomWords(customWordsParsed)) {
      room.customWords = customWordsParsed;
      setErrorMessage("");
      updateRoom();
    } else {
      setErrorMessage("Invalid custom words");
    }
  };

  const updateOnlyCustomWords = () => {
    room.onlyCustomWords = !room.onlyCustomWords;
    updateRoom();
  };

  const startGame = () => {
    console.log("start game");
  };


  const [customWords, setCustomWords] = useState("");

  return (
    <div className="settings">
      <h2>Settings</h2>
      {room && (
        <div className="settings-container">
          <h3>Lobby</h3>
          <div className="settingsContent">
            <div className="inputsContainer">
              <div className="form-group">
                <label>Rounds</label>
                <select
                  className="form-control"
                  value={room.rounds}
                  onChange={(e) => updateRounds(e)}
                  disabled={room.owner === socket.id ? false : true}
                >
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
              <div className="form-group">
                <label>Draw time in seconds</label>
                <select
                  className="form-control"
                  value={room.drawTime}
                  onChange={(e) => updateDrawTime(e)}
                  disabled={room.owner === socket.id ? false : true}
                >
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                  <option>100</option>
                  <option>110</option>
                  <option>120</option>
                  <option>130</option>
                  <option>140</option>
                  <option>150</option>
                  <option>160</option>
                  <option>170</option>
                  <option>180</option>
                </select>
              </div>
              <div className="form-group">
                <label>language</label>
                <select
                  className="form-control"
                  value={room.language}
                  onChange={(e) => updateLanguage(e)}
                  disabled={room.owner === socket.id ? false : true}
                >
                  <option>English</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="form-group">
                <label>Custom Words</label>
                <textarea
                  className="form-control"
                  placeholder="Type your custom words separated by a comma. (Minimum of 4 words, maximun of 30 characters per word)"
                  value={customWords}
                  onChange={(e) => setCustomWords(e.target.value)}
                  onBlur={() => updateCustomWords()}
                  disabled={room.owner === socket.id ? false : true}
                ></textarea>
                <div className="error">{errorMessage}</div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={room.onlyCustomWords}
                      onChange={() => updateOnlyCustomWords()}
                      disabled={room.owner === socket.id ? false : true}
                    />
                    Use custom words exclusively.
                  </label>
                </div>
              </div>
            </div>
            <div className="buttonsContainer">
              <button
                className="button btn btn-success btn-block"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
