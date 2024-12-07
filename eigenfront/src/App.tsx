import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Swap from "./pages/SwapPage/Swap";
import Background from "./components/Background";
import Orderbook from "./pages/OrderbookPage/Orderbook";

const App: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
    
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Background />
      </div>

   
      <div className="relative z-10">
        <Router>
       
          <Navbar />
          <div className="pt-16"> 
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/orderbook" element={<Orderbook />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
