import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import './styles/DonationRequestForm.css'; // Ensure you have a CSS file for styling

const DonationRequestForm = () => {
    const [formData, setFormData] = useState({
        quantity: '',
        type: '', // New field for the type of donation
        description: '',
        donorName: '',
        email: '',
        donorOrganization: '', // Updated from donorNumber to donorOrganization
    });

    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/donations/food', formData, {
                withCredentials: true, // If your backend requires credentials
            });
            console.log('Form submitted successfully:', response.data);
            alert('Donation request submitted successfully and WhatsApp confirmation sent!');
            // Reset form
            setFormData({
                quantity: '',
                type: '',
                description: '',
                donorName: '',
                email: '',
                donorOrganization: '', // Updated from donorNumber to donorOrganization
            });
        } catch (error) {
            console.error('Error submitting donation request:', error);
            alert('Failed to submit donation request. Please try again.');
        }
    };

    // List of donation organizations from initialLocations
    const donationOrganizations = [
        "VATSALYAPURAM TRUST NGO",
        "PREMAANAJALI",
        "NEED BASE INDIA: LAKSHYA UDAAN",
        "Need Base India-Rainbow Home",
        "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
        "AMRUTHA SHISHU NIVASA",
        "BELAKU SHISHU NIVASA",
        "Bosco Yuvodaya",
        "BOSCO Mane",
        "BOSCO Yuvakendra",
        "BOSCO Nilaya",
        "BOSCO Summanahalli",
        "BOSCO Nivas",
        "BOSCO Vatsalya Bhavan",
        "Auxilium Navajeevana",
    ];

    // List of types for the dropdown (from Food items)
    const donationTypes = ["Plate Meals", "Bulk Items", "Raw Items", "Processed Items"];

    return (
        <div className="donation-form-container" style={{ textAlign: "center", marginTop: isMobile ? "" : "-5em" }}>
            <h2>Request a Donation</h2>
            <form onSubmit={handleSubmit} className='form' style={{ backgroundColor: "#04546d", marginTop: "-0.5px", padding: isMobile ? "" : "5em" }}>
                <div style={{ display: "flex", flexDirection: "column", marginRight: "-1em" }}>
                    <label>
                        Quantity:
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="form-input" // Add class for uniform styling
                        />
                    </label>
                    <label>
                        Type:
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="form-input" // Add class for uniform styling
                            style={{ width: "95%" }}
                        >
                            <option value="">Select a Type</option>
                            {donationTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="form-input" // Add class for uniform styling
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
                            className="form-input" // Add class for uniform styling
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
                            className="form-input" // Add class for uniform styling
                        />
                    </label>
                    <label>
                        Donation Organization:
                        <select
                            name="donorOrganization" // Updated from donorNumber to donorOrganization
                            value={formData.donorOrganization}
                            onChange={handleChange}
                            required
                            className="form-input" // Add class for uniform styling
                            style={{ width: "95%" }}
                        >
                            <option value="">Select an Organization</option>
                            {donationOrganizations.map((org, index) => (
                                <option key={index} value={org}>{org}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ display: "flex", marginLeft: "11em", marginTop: isMobile ? "" : "2em" }}>
                    <button type="submit" className="form-button">Submit</button> {/* Add class for uniform styling */}
                </div>
            </form>
        </div>
    );
};

export default DonationRequestForm;