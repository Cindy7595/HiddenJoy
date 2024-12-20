import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs from './Components/Programs/Programs';
import Title from './Components/Title/Title';
import Maps from './Components/Maps/Maps';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes> {/*From Form to Maps */}
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <div className="container">
                  <Title />
                  <Programs />
                </div>
              </div>
            }
          />
          <Route path="/maps" element={<Maps />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
