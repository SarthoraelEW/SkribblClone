import React from "react";
import { useCookies } from "react-cookie";

const AUDIO_ON_URL = "./assets/images/audio.gif";
const AUDIO_OFF_URL = "./assets/images/audio_off.gif";

const MuteButton = () => {
  const [cookies, setCookie] = useCookies(['mute']);

  if (cookies.mute === undefined) {
    setCookie('mute', "false", { path: '/' });
  }

  const changeMuteCookie = (mute) => {
    if (mute === "false") {
      setCookie('mute', "true", { path: '/' });
    } else {
      setCookie('mute', "false", { path: '/' });
    }
  }

  return (
    <div
      className="mute-button"
      onClick={() => changeMuteCookie(cookies.mute)}
      style={{
        backgroundImage: `url("${cookies.mute === "true" ? AUDIO_OFF_URL : AUDIO_ON_URL}"`,
      }}
      title="Toggle Audio"
    ></div>
  );
};

export default MuteButton;
