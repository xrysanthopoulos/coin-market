import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MarketsPage from './MarketsPage';
import CoinPage from './CoinPage';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketsPage />}/>
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
