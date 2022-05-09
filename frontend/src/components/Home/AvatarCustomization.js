import React, { useState } from 'react';
import Atlas from '../Atlas';
import { getRandomInt } from '../Utils';

const NB_COLOR = 18;
const NB_MOUTH = 24;
const NB_EYES = 31;

const AvatarCustomization = (props) => {

  const {color, setColor, mouth, setMouth, eyes, setEyes} = props;

  const randomize = () => {
    setColor(getRandomInt(NB_COLOR));
    setMouth(getRandomInt(NB_MOUTH));
    setEyes(getRandomInt(NB_EYES));
  };

  const incColor = () => {
    if (color + 1 === NB_COLOR) {
      setColor(0);
    } else {
      setColor(color + 1);
    }
  }

  const decColor = () => {
    if (color === 0) {
      setColor(NB_COLOR - 1);
    } else {
      setColor(color - 1);
    }
  }

  const incMouth = () => {
    if (mouth + 1 === NB_MOUTH) {
      setMouth(0);
    } else {
      setMouth(mouth + 1);
    }
  }

  const decMouth = () => {
    if (mouth === 0) {
      setMouth(NB_MOUTH - 1);
    } else {
      setMouth(mouth - 1);
    }
  }

  const incEyes = () => {
    if (eyes + 1 === NB_EYES) {
      setEyes(0);
    } else {
      setEyes(eyes + 1);
    }
  }

  const decEyes = () => {
    if (eyes === 0) {
      setEyes(NB_EYES - 1);
    } else {
      setEyes(eyes - 1);
    }
  }

  return (
    <div className='avatar-customization'>
      <div className='randomize-button' onClick={randomize}></div>
      <div className='arrows'>
        <div className='arrow left-arrow' onClick={decEyes}></div>
        <div className='arrow left-arrow' onClick={decMouth}></div>
        <div className='arrow left-arrow' onClick={decColor}></div>
      </div>
      <div className='atlas-container'>
        <Atlas color={color} eyes={eyes} mouth={mouth} special={null} owner={false} scale={2} />
      </div>
      <div className='arrows'>
        <div className='arrow right-arrow' onClick={incEyes}></div>
        <div className='arrow right-arrow' onClick={incMouth}></div>
        <div className='arrow right-arrow' onClick={incColor}></div>
      </div>
    </div>
  );
};

export default AvatarCustomization;