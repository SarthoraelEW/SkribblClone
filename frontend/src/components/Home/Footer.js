import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="twitterLink">
        <a href="https://twitter.com/SarthoraelEW">
          <img
            className="footerTwitterIcon"
            src="./assets/images/twitter.png"
            alt="twitter icon"
          />
          made by @SarthoraelEW
        </a>
      </div>
      <div className="tos">
        <a href="mailto:anthony.dufay1@gmail.com">Contact</a>
        &nbsp;
        <a href="/terms">Terms of Service</a>
        &nbsp;
        <a href="/credits">Credits</a>
      </div>
      <div>
        <p>
          The owner of this site is not responsible for any user generated content (drawings, messages, usernames)
        </p>
      </div>
    </div>
  );
};

export default Footer;
