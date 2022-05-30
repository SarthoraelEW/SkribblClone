import React from 'react';

const Overlay = ({room, words, isDisplay}) => {
  return (
    <div className='overlay' style={{display: `${isDisplay ? "auto" : "none"}`}}>
      <div className='content'>
        
      </div>
    </div>
  );
};

export default Overlay;