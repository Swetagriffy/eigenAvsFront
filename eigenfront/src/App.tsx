import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swap from './pages/SwapPage/Swap';
import Background from './components/Background'; // Import Background
import FaucetForm from './pages/Faucet/Faucet';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Background />
      </div>

      {/* Routing */}
      <div className="relative z-10">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Swap />} />
            <Route path="/faucet" element={<FaucetForm />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
