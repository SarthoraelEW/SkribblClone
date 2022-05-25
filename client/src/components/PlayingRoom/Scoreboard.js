import React, { useContext } from "react";
import { SocketContext } from "../AppContext";
import Atlas from "../Atlas";

const Scoreboard = ({ room }) => {
  const socket = useContext(SocketContext);

  const getRank = (player) => {
    let rank = 1;
    room.players.forEach((p) => {
      if (p.points > player.points) {
        rank++;
      }
    });
    return rank;
  };

  return (
    <div className="scoreboard">
      <div className="players">
        {room &&
          room.players.map((player) => {
            return (
              <div className="scoreboardTab" key={player.id}>
                <div className="rank">#{getRank(player)}</div>
                <div className="nameAndPoints">
                  <div className="name">
                    {player.username + (player.id === socket.id ? " (you)" : "")}
                  </div>
                  <div className="points">Points: {player.points}</div>
                </div>
                {room.currentPlayer === player.id && (
                  <img className="pen"
                    src="./assets/images/pen.gif"
                    alt="pen (currentPlayer)"
                  />
                )}
                <Atlas
                  color={player.atlas.color}
                  mouth={player.atlas.mouth}
                  eyes={player.atlas.eyes}
                  special={null}
                  owner={player.id === room.owner}
                  scale={1}
                />
              </div>
            );
          })}
      </div>
      <button className="btn btn-warning btn-block">Votekick</button>
    </div>
  );
};

export default Scoreboard;
