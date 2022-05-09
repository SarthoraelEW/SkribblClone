import React, { useState } from "react";

const GameInformation = () => {

  const [expandedNews, setExpandedNews] = useState(false);
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedHow, setExpandedHow] = useState(false);

  return (
    <div className="game-information">
      <div className="informationTabs">
        <div id="newsTab" className="tab" onClick={() => setExpandedNews(!expandedNews)}>
          <h3>News</h3>
        </div>
        <div id="newsContent" className={"updateInfo content" + (expandedNews ? " max-content" : "")}>
          Hello!
          <br/>
          <br/>
          We added:
          <ul>
            <li>
              <b>New Languages:</b>
              <i>Italian, Estonian, Korean, Hungarian and Tagalog.</i>
            </li>
            <li>
              More player support with up to <b>12</b> players in private rooms!
            </li>
            <li>
              <b>Custom words</b> in private rooms.
            </li>
            <li>
              <b>Custom drawing time</b> in private rooms.
            </li>
          </ul>
          Please check out the new languages and report any spelling issues if you like!
          <br/>
          <br/>
          <i>Thanks.</i>
        </div>
        <div id="aboutTab" className="tab" onClick={() => setExpandedAbout(!expandedAbout)}>
          <h3>About</h3>
        </div>
        <div id="aboutContent" className={"content" + (expandedAbout ? " max-content" : "")}>
          <b>skribbl.io </b>
          is a free multiplayer drawing and guessing game.
          <br/>
          One game consists of a few rounds in which every round someone has to draw their chosen word and others have to guess it to gain points!
          <br/>
          The person with the most points at the end of game will then be crowned as the winner!
        </div>
        <div id="howTab" className="tab" onClick={() => setExpandedHow(!expandedHow)}>
          <h3>How</h3>
        </div>
        <div id="howContent" className={"content" + (expandedHow ? " max-content" : "")}>
          When its your turn to draw, you will have to choose a word from three options and visualize that word in 80 seconds,
          alternatively when somebody else is drawing you have to type your guess into the chat to gain points, be quick,
          the earlier you guess a word the more points you get!
        </div>
      </div>
    </div>
  );
};

export default GameInformation;
