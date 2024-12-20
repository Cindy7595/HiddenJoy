import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import map from '../../assets/map.gif'

const Navbar = () => {
  const navigate = useNavigate();

  // Function to navigate to the home page
  const goHome = () => {
    navigate('/');
  };

  return (
    <nav className='container'>
        <img src={map} alt="" className='map' onClick={goHome}/> 
        <ul>
            <li><button className='btn' onClick={goHome}>Home</button></li>
            <li><button className='btn'>About</button></li>
            <li><button className='btn'>Testimonials</button></li>
        </ul>
    </nav>
  )
}

export default Navbar;
