import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from '../../pages/Home';
import PlayingRoom from '../../pages/PlayingRoom';
import PrivateRoom from '../../pages/PrivateRoom';
import TermsOfService from '../../pages/TermsOfService';
import Credits from '../../pages/Credits';
 
const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/private-room' element={<PrivateRoom />} />
        <Route path='/playing-room' element={<PlayingRoom />} />
        <Route path='/terms' element={<TermsOfService />} />
        <Route path='/credits' element={<Credits />} />
      </Routes>
    </Router>
  );
};

export default Index;