import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import './styles/DonationRequestForm.css'; // Create a CSS file for styling

const DonationRequestForm = () => {
    const [formData, setFormData] = useState({
        quantity: '',
        description: '',
        donorName: '',
        email: '',
        donorNumber: '',
    });

    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="donation-form-container" style={{ textAlign: "center", }}>
            <h2>Request a Donation</h2>
            <form onSubmit={handleSubmit} className='form' style={{ backgroundColor: "#04546d", marginTop: "-0.5px" }}>
                <div style={{ display: "flex", flexDirection: "column", marginRight: "-1em" }}>
                    <label>
                        Quantity:
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Donor Name:
                        <input
                            type="text"
                            name="donorName"
                            value={formData.donorName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email ID:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Donor Number:
                        <input
                            type="text"
                            name="donorNumber"
                            value={formData.donorNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div style={{ display: "flex", marginLeft: "12em" }}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default DonationRequestForm; 