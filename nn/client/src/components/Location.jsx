import React from "react";
import "./styles/Locations.css";

const initialLocations = [
    {
        name: "VATSALYAPURAM TRUST NGO",
        latitude: 12.9224418,
        longitude: 77.5824046,
        description: "This is VATSALYAPURAM TRUST NGO",
        images: ["./images/1_1.jpg"],
    },
    {
        name: "PREMAANAJALI",
        latitude: 12.9159589,
        longitude: 77.5911647,
        description: "This is PREMAANAJALI Orphanage",
        images: ["./images/2_1.jpg"],
    },
    {
        name: "NEED BASE INDIA: LAKSHYA UDAAN",
        latitude: 12.957973,
        longitude: 77.5887809,
        description: "This is NEED BASE INDIA: LAKSHYA UDAAN",
        images: ["./images/3_4.jpg"],
    },
    {
        name: "Need Base India-Rainbow Home",
        latitude: 12.0461353,
        longitude: 77.54949548,
        description: "This is Need Base India-Rainbow Home",
        images: ["./images/3_2_1.jpg"],
    },
    {
        name: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPMENT CENTER",
        latitude: 12.9378698,
        longitude: 77.5387422,
        description: "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPMENT CENTER",
        images: ["./images/4_1.jpg"],
    },
    {
        name: "AMRUTHA SHISHU NIVASA",
        latitude: 12.941669,
        longitude: 77.5670684,
        description: "This is AMRUTHA SHISHU NIVASA",
        images: ["./images/5_6.jpg"],
    },
    {
        name: "BELAKU SHISHU NIVASA",
        latitude: 12.9398111,
        longitude: 77.566134,
        description: "This is BELAKU SHISHU NIVASA",
        images: ["./images/6_2.jpg"],
    },
    {
        name: "Bosco Yuvodaya",
        latitude: 12.97935,
        longitude: 77.57596,
        description: "This is Bosco Yuvodaya",
        images: ["./images/7_1_1.jpg"],
    },
    {
        name: "BOSCO Mane",
        latitude: 12.9583419,
        longitude: 77.569181,
        description: "This is BOSCO Mane",
        images: ["./images/7_2_1.jpg"],
    },
    {
        name: "BOSCO Yuvakendra",
        latitude: 12.9730467,
        longitude: 77.56277,
        description: "This is BOSCO Yuvakendra",
        images: ["./images/7_3_1.jpg"],
    },
    {
        name: "BOSCO Nilaya",
        latitude: 12.9674429,
        longitude: 77.571919,
        description: "This is BOSCO Nilaya",
        images: ["./images/7_4_1.jpg"],
    },
    {
        name: "BOSCO Summanahalli",
        latitude: 12.9807156,
        longitude: 77.517275,
        description: "This is BOSCO Summanahalli ",
        images: ["./images/7_4_1.jpg"],
    },
    {
        name: "BOSCO Nivas",
        latitude: 12.9848622,
        longitude: 77.60404,
        description: "This is BOSCO Nivas ",
        images: ["./images/7_4_1.jpg"],
    },
    {
        name: "BOSCO Vatsalya Bhavan",
        latitude: 12.9598526,
        longitude: 77.567894,
        description: "This is BOSCO Vatsalya Bhavan",
        images: ["./images/7_6_1.jpg"],
    },
    {
        name: "Auxilium Navajeevana",
        latitude: 12.9607131,
        longitude: 77.563616,
        description: "This is Auxilium Navajeevana",
        images: ["./images/8_1.jpg"],
    },
];

const Locations = () => {
    return (
        <div className="locations-container">
            <h1 className="title">NGOs & Orphanages</h1>
            <div className="locations-list">
                {initialLocations.map((location, index) => (
                    <div key={index} className="location-card">
                        <img
                            src={location.images[0]}
                            alt={location.name}
                            className="location-image"
                        />
                        <div className="location-info">
                            <h2 className="location-name">{location.name}</h2>
                            <p className="location-description">{location.description}</p>
                            <p className="location-coordinates">
                                📍 {location.latitude}, {location.longitude}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Locations;
