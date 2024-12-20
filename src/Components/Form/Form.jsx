import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = ({ activeForm, closeForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipcode: '',
  });

  const navigate = useNavigate();

  if (!activeForm) return null; // Should not render the form if it is not active.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { //when user submits it sends the zipcode over to maps 
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/maps',{state:{zipcode:formData.zipcode}});
  };

  return ( //Pop up form that takes use input and takes name of Event to add as name of form
    <div className="form-modal">
      <div className="form-content">
        <h2>{activeForm}</h2> 
        <form onSubmit={handleSubmit}>
        <label>
        Your First Name:
        <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            autoComplete="given-name" 
            required
        />
    </label>
    <label>
        Your Last Name:
        <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            autoComplete="family-name" 
            required
        />
    </label>
    <label>
        Your Email:
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email" 
            required
        />
    </label>
    <label>
        Zipcode of Event:
        <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            autoComplete="postal-code"
            required
        />
    </label>
          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={closeForm}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Form;
