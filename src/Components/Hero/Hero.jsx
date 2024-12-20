import React from 'react'
import './Hero.css'

const Hero = () => {
    const scrollToPrograms = () =>{
        const programSection = document.getElementById('title-section');
        //console.log(programSection); 
        if(programSection){
            programSection.scrollIntoView({behavior:'smooth', block:'start'}); //Scrolls down to events after clicking Get Started button 
        }
    };
  return (
    <div className='hero container'>
        <div className= 'hero-text'>
            <h1>HiddenJoys</h1>
            <p>Turn any event into an unforgettable adventure with HiddenJoy—the app that lets you create custom scavenger hunts tailored for your special occasion. Whether you're planning a birthday bash, a bridal shower, a team-building day, or even a legendary bar crawl, HiddenJoy transforms ordinary moments into exciting quests filled with surprises and laughter.
            </p>
            <button className='btn' onClick={scrollToPrograms}>Get Started</button>
        </div>
    </div>
    
  )
}

export default Hero
