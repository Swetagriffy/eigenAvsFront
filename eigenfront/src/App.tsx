import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Swap from "./pages/SwapPage/Swap";
import Background from "./components/Background"; // Import Background

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
          <Routes>
            <Route path="/" element={<Swap />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
