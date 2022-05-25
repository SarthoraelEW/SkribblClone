import React from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO_URL = "./assets/images/logo.gif";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='headerPrivateRoom'>
      <img className="smallLogo" src={LOGO_URL} alt="Logo" onClick={() => navigate("/")}/>
    </div>
  );
};

export default Header;