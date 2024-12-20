import React, { useState } from 'react';
import './Programs.css';
import Form from '../Form/Form';
import birthday from '../../assets/birthday.png';
import anniversary from '../../assets/wedding-date.png';
import bar from '../../assets/bar.png';
import management from '../../assets/management.png';
import bride from '../../assets/bride.png';
import husband from '../../assets/husband.png';

const Programs = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleProgramClick = (formName) => { //Form popup
    setActiveForm(formName);
  };

  const closeForm = () => {
    setActiveForm(null);
  };

  return ( //Should be called Events section but basically all clickable images for type of events
    <div id="programs-section">
      <div className="programs">
        <div className="program" onClick={() => handleProgramClick('Birthday')}>
          <img src={birthday} alt="Birthday" />
          <div className="text-overlay">Birthday</div>
        </div>
        <div className="program" onClick={() => handleProgramClick('Anniversary')}>
          <img src={anniversary} alt="Anniversary" />
          <div className="text-overlay">Anniversary</div>
        </div>
        <div className="program" onClick={() => handleProgramClick('Bar Crawl')}>
          <img src={bar} alt="Bar Crawl" />
          <div className="text-overlay">Bar Crawl</div>
        </div>
        <div className="program" onClick={() => handleProgramClick('Team Building')}>
          <img src={management} alt="Team Building" />
          <div className="text-overlay">Team Building</div>
        </div>
        <div className="program" onClick={() => handleProgramClick('Bachelorette Party')}>
          <img src={bride} alt="Bachelorette Party" />
          <div className="text-overlay">Bachelorette Party</div>
        </div>
        <div className="program" onClick={() => handleProgramClick('Bachelor Party')}>
          <img src={husband} alt="Bachelor Party" />
          <div className="text-overlay">Bachelor Party</div>
        </div>
      </div>

      <Form activeForm={activeForm} closeForm={closeForm} />
      
    </div>
  );
};

export default Programs;
