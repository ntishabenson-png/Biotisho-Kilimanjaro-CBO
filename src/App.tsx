import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import About from './pages/About';
import OurWork from './pages/OurWork';
import GetInvolved from './pages/GetInvolved';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import DonatePage from './pages/DonatePage';
import DonationStatus from './pages/DonationStatus'


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/donation-success" element={<DonationStatus />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;