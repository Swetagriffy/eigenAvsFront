import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swap from './pages/SwapPage/Swap';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Swap />} />
      </Routes>
    </Router>
  );
};

export default App;
