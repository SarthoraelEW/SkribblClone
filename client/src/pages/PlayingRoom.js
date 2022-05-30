import React, { useState } from "react";
import Draw from "../components/PlayingRoom/Draw";
import RoundDetails from "../components/PlayingRoom/RoundDetails";
import Header from "../components/PrivateRoom/Header";
import MuteButton from "../components/MuteButton";
import Scoreboard from "../components/PlayingRoom/Scoreboard";
import Chat from "../components/PlayingRoom/Chat";
import Overlay from "../components/PlayingRoom/Overlay";

const testPlayers = [
  {
    id: "1",
    username: "toto",
    atlas: {
      color: 1,
      mouth: 1,
      eyes: 1,
      special: null,
      owner: true,
    },
    language: "",
    points: 100,
    foundWord: false,
  },
  {
    id: "2",
    username: "tata",
    atlas: {
      color: 2,
      mouth: 2,
      eyes: 2,
      special: null,
      owner: false,
    },
    language: "",
    points: 200,
    foundWord: true,
  },
  {
    id: "3",
    username: "titi",
    atlas: {
      color: 3,
      mouth: 3,
      eyes: 3,
      special: null,
      owner: false,
    },
    language: "",
    points: 100,
    foundWord: false,
  },
];

const testChatMessages = [
  {
    message: "Toto is drawing",
    sender: null,
    type: "INFO",
  },
  {
    message: "Yoooo",
    sender: "1",
    type: "",
  },
  {
    message: "Wsh",
    sender: "2",
    type: "",
  },
  {
    message: "Tata found the word",
    sender: null,
    type: "SUCCESS",
  },
];

const testRoom = {
  owner: "1",
  players: testPlayers,
  rounds: 3,
  drawTime: 80,
  language: "",
  customWords: [],
  onlyCustomWords: false,
  currentRound: 1,
  currentPlayer: testPlayers[0].id,
  firstPlayerRound: 1,
  wordToFind: "avion",
  chatMessages: testChatMessages,
};

const PlayingRoom = () => {
  const [overlayShowed, setOverlayShowed] = useState(true);

  return (
    <div className="page">
      <MuteButton />
      <div className="page-container">
        <Header />
        <div className="playingRoom">
          <RoundDetails room={testRoom} />
          <div className="playingRoomContainer">
            <Scoreboard room={testRoom} />
            <div className="draw">
              <Draw />
              <Overlay isDisplay={overlayShowed}/>
            </div>
            <Chat room={testRoom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingRoom;
