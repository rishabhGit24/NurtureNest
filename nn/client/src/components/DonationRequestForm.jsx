import { useMediaQuery } from '@mui/material';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for dynamic routing
import './styles/DonationRequestForm.css'; // Ensure you have a CSS file for styling

const DonationRequestForm = () => {
    const { category } = useParams(); // Get the category from the URL (e.g., /food, /clothes)
    const [formData, setFormData] = useState({
        quantity: '',
        type: '', // New field for the type of donation
        description: '',
        donorName: '',
        email: '',
        donorOrganization: '', // Updated from donorNumber to donorOrganization
        donorPhone: '', // New field for user’s phone number
    });

    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dynamically set the endpoint based on the category, default to 'food' if undefined
            const safeCategory = category ? category.toLowerCase() : 'food';
            const endpoint = `/api/donations/${safeCategory}`;
            const response = await axios.post(`http://192.168.1.109:4000${endpoint}`, formData, {
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
                donorPhone: '', // Reset new phone number field
            });
        } catch (error) {
            console.error('Error submitting donation request:', error);
            alert('Failed to submit donation request. Please try again.');
        }
    };

    // Define all donation categories and their items
    const categories = [
        {
            title: "Food",
            items: ["Plate Meals", "Bulk Items", "Raw Items", "Processed Items"],
        },
        { title: "Clothes", items: ["Men", "Women", "Kids"] },
        { title: "Education", items: ["Stationary", "Bags", "Essentials"] },
        { title: "Medical", items: ["Cotton", "Tapes", "Scissor", "Dettol"] },
        { title: "Money", items: ["UPI"] },
    ];

    // Determine the current category and its items, with fallback to 'Food' if category is undefined
    const safeCategory = category ? category.toLowerCase() : 'food';
    const currentCategory = categories.find(cat => cat.title.toLowerCase() === safeCategory);
    const donationTypes = currentCategory ? currentCategory.items : []; // Default to empty if category not found

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

    return (
        <div className="donation-form-container" style={{ textAlign: "center", marginTop: isMobile ? "" : "-5em", marginLeft: isMobile ? "-1em" : "" }}>
            <h2>Request a Donation - {currentCategory?.title || 'Food'}</h2> {/* Default to 'Food' if no category */}
            <form onSubmit={handleSubmit} className='form' style={{ backgroundColor: "#53AEC6", marginTop: "-0.5px", padding: isMobile ? "" : "5em", width: isMobile ? "94%" : "", }}>
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
                        Donor Phone Number:
                        <input
                            type="tel"
                            name="donorPhone"
                            value={formData.donorPhone}
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
                <div style={{ display: "flex", marginLeft: isMobile ? "8em" : "11em", marginTop: isMobile ? "" : "2em" }}>
                    <button type="submit" className="form-button">Submit</button> {/* Add class for uniform styling */}
                </div>
            </form>
        </div>
    );
};

export default DonationRequestForm;