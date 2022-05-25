import React, { useContext, useState } from 'react';
import { SocketContext } from "../AppContext";

const RoundDetails = ({room}) => {
  const socket = useContext(SocketContext);

  const [timer, setTimer] = useState(room.drawTime);
  const [hiddenWord, setHiddenWord] = useState("_".repeat(room.wordToFind.length));

  return (
    <div className='roundDetails'>
      <div className='timerContainer'>
        <div className='timer'>
          {timer}
        </div>
      </div>
      <div id='round'>{`Round ${room.currentRound} of ${room.rounds}`}</div>
      <div id='currentWord'>{room.currentPlayer === socket.id ? room.wordToFind : hiddenWord}</div>
    </div>
  );
};

export default RoundDetails;