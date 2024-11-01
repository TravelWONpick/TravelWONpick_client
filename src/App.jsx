import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage'
import Header from './components/Header';
import PricePick from './pages/PricePick';
import CardPick from './pages/CardPick';
import Event from './pages/Event';
import Etc from './pages/MainPage';

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/pricePick/" element={<PricePick />}></Route>
            <Route path="/cardPick/" element={<CardPick />}></Route>
            <Route path="/event/" element={<Event />}></Route>
            {/* <Route path="https://pc.wooricard.com/dcpc/yh1/fpf/fpf01/H1FPF201S00.do" element={<Etc />}></Route> */}
            </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
