import React from 'react';
import MuteButton from '../components/MuteButton';
import Header from '../components/Home/Header';
import PlayerForm from '../components/Home/PlayerForm';
import GameInformation from '../components/Home/GameInformation';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <div className='page'>
      <MuteButton />
      <div className='home-container'>
        <Header />
        <PlayerForm />
        <GameInformation />
        <Footer />
      </div>
    </div>
  );
};

export default Home;