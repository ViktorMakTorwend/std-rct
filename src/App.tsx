import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FavoritesPages } from './pages/FavoritesPages';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavoritesPages />} />
      </Routes>
    </>
  )
}

export default App;