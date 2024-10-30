import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PricePick from './components/routes/PricePick';
import CardPick from './components/routes/CardPick';
import Event from './components/routes/Event';
import Etc from './components/routes/Etc';

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<PricePick />}/>
            <Route path="/pricePick/" element={<PricePick />}></Route>
            <Route path="/cardPick/" element={<CardPick />}></Route>
            <Route path="/event/" element={<Event />}></Route>
            <Route path="/etc/" element={<Etc />}></Route>
            </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
