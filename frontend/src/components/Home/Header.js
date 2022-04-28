import React from "react";
import Atlas from "../Atlas";
import { getRandomInt } from "../Utils";

const LOGO_URL = "./assets/images/logo.gif";

const NB_ATLAS = 8;
const NB_COLOR = 18;
const NB_MOUTH = 24;
const NB_EYES = 31;
const NB_SPECIAL = 5;

const Header = () => {
  const owner = getRandomInt(NB_ATLAS);

  const generateRamdomAvatars = () => {
    const avatars = [];
    let specialSet = false;
    for (let i = 0; i < NB_ATLAS; i++) {
      const color = getRandomInt(NB_COLOR);
      const mouth = getRandomInt(NB_MOUTH);
      const eyes = getRandomInt(NB_EYES);
      let special = null;
      if (!specialSet && i !== owner && Math.random() < 0.25) {
        special = getRandomInt(NB_SPECIAL);
        specialSet = true;
      }
      avatars.push({color: color, mouth: mouth, eyes: eyes, special: special});
    }
    return avatars;
  };

  const avatars = generateRamdomAvatars();

  return (
    <div className="header">
      <img className="logo" src={LOGO_URL} alt="Logo" />
      <div className="logo-avatar-container">
        {avatars.map((avatar, index) => {
          return (
            <Atlas
              color={avatar.color}
              mouth={avatar.mouth}
              eyes={avatar.eyes}
              special={avatar.special}
              owner={index === owner}
              scale={1}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Header;
