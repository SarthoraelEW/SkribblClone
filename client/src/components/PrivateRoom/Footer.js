import React, { useState } from "react";

const HOVER_VALUE = "Hover over me to see the invite link";

const Footer = ({ token }) => {
  const [valueShowed, setValueShowed] = useState(HOVER_VALUE);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <div className="footer">
      <h2>Invite your friends!</h2>
      <div className="invite-bar">
        <div
          className="invite"
          onMouseEnter={() => setValueShowed(token)}
          onMouseLeave={() => setValueShowed(HOVER_VALUE)}
        >
          <h3>{valueShowed}</h3>
        </div>
        <button className="button btn btn-warning" onClick={copyToken}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default Footer;
