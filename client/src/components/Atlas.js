import React from "react";

const BACKGROUND_SIZE = 480;
const SPECIAL_BACKGROUND_SIZE = 800;

const ATLAS_WIDTH = 48;
const ATLAS_HEIGHT = 48;

const SPECIAL_ATLAS_WIDTH = 80;
const SPECIAL_ATLAS_HEIGHT = 80;

const Atlas = (props) => {
  const { color, mouth, eyes, special, owner, scale } = props;

  const getAtlasWidth = (index) => {
    return (index % 10) * -ATLAS_WIDTH * scale;
  };

  const getAtlasHeight = (index) => {
    return Math.floor(index / 10) * -ATLAS_HEIGHT * scale;
  };

  const getSpecialAtlasWidth = (index) => {
    return (index % 10) * -SPECIAL_ATLAS_WIDTH * scale;
  };

  const getSpecialAtlasHeight = (index) => {
    return Math.floor(index / 10) * -SPECIAL_ATLAS_HEIGHT * scale;
  };


  return (
    <div className="avatar"
         style={{
           width: `${ATLAS_WIDTH * scale}px`,
           height: `${ATLAS_HEIGHT * scale}px`
         }}
         >
      <div
        className="sprite color"
        style={{
          backgroundSize: `${BACKGROUND_SIZE * scale}px ${BACKGROUND_SIZE * scale}px`,
          backgroundPosition: `${getAtlasWidth(color)}px ${getAtlasHeight(color)}px`,
        }}
      ></div>
      <div
        className="sprite mouth"
        style={{
          backgroundSize: `${BACKGROUND_SIZE * scale}px ${BACKGROUND_SIZE * scale}px`,
          backgroundPosition: `${getAtlasWidth(mouth)}px ${getAtlasHeight(mouth)}px`,
        }}
      ></div>
      <div
        className="sprite eyes"
        style={{
          backgroundSize: `${BACKGROUND_SIZE * scale}px ${BACKGROUND_SIZE * scale}px`,
          backgroundPosition: `${getAtlasWidth(eyes)}px ${getAtlasHeight(eyes)}px`,
        }}
      ></div>
      {special !== null && (
        <div
          className="sprite special"
          style={{
            backgroundSize: `${SPECIAL_BACKGROUND_SIZE * scale}px ${SPECIAL_BACKGROUND_SIZE * scale}px`,
            backgroundPosition: `${getSpecialAtlasWidth(special)}px ${getSpecialAtlasHeight(special)}px`,
          }}
        ></div>
      )}
      {owner && (
        <div className="owner"></div>
      )}
    </div>
  );
};

export default Atlas;
