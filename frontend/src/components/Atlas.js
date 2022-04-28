import React from "react";

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
    <div className="avatar">
      <div
        className="sprite color"
        style={{
          backgroundPosition: `${getAtlasWidth(color)}px ${getAtlasHeight(color)}px`,
        }}
      ></div>
      <div
        className="sprite mouth"
        style={{
          backgroundPosition: `${getAtlasWidth(mouth)}px ${getAtlasHeight(mouth)}px`,
        }}
      ></div>
      <div
        className="sprite eyes"
        style={{
          backgroundPosition: `${getAtlasWidth(eyes)}px ${getAtlasHeight(eyes)}px`,
        }}
      ></div>
      {special !== null && (
        <div
          className="sprite special"
          style={{
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
