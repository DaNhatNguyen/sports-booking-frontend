import React from 'react';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';
import SearchBar from '../components/SearchBar';
import NearbyCourts from '../components/NearbyCourts';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <div style={{ position: 'relative' }}>
        <ImageSlider />
        <SearchBar />
        <div style={{ height: '150px' }} />
      </div>
      <NearbyCourts />
      <Footer />
    </>
  );
};

export default HomePage;
