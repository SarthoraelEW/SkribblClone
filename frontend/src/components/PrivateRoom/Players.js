import React, { useContext } from "react";
import { SocketContext } from "../AppContext";
import Atlas from "../Atlas";

const Players = ({ room }) => {
  const socket = useContext(SocketContext);

  return (
    <div className="players">
      <h2>Players</h2>
      <div className="players-container">
        {room.players.map((player) => {
          return (
            <div className="player" key={player.id}>
              <Atlas
                color={player.atlas.color}
                mouth={player.atlas.mouth}
                eyes={player.atlas.eyes}
                special={null}
                owner={player.id === room.owner}
                scale={2}
              />
              <h5 className="name">{player.username}</h5>
              {socket.id === player.id && <h5 className="you">You</h5>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Players;
