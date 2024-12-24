import React from "react";
import "../styles/ClothItem.css";

export default function ClothItem() {
    return (
        <span className="cloth" style={{ borderRadius: "25%" }}>
            <div style={{ backgroundColor: "wheat", width: "83%", marginLeft: "2.6em", marginTop: "2em", }}>
                <a href="clothes.html" target="_blank" ><h1 id="clothh" ><b style={{ backgroundColor: "wheat", borderTopLeftRadius: "25%" }}>CLOTHES</b></h1><hr /></a>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2em",
                        flexDirection: "column",
                        marginTop: "5em",
                        backgroundColor: "wheat",
                    }}
                >
                    <ul
                        id="clot11"
                        style={{
                            backgroundColor: "wheat",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            position: "relative", // Important for positioning the dropdown
                        }}
                    >
                        <li
                            style={{
                                backgroundColor: "wheat",
                                padding: "10px",
                                fontSize: "24px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            MEN
                        </li>
                        <div
                            style={{
                                display: "none",
                                position: "absolute",
                                top: "100%", // Position below the parent
                                left: "0",
                                backgroundColor: "wheat",
                                padding: "10px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Top Wear
                            </li>
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Bottom Wear
                            </li>
                        </div>
                    </ul>

                    <ul
                        id="clot12"
                        style={{
                            backgroundColor: "wheat",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            position: "relative",
                        }}
                    >
                        <li
                            style={{
                                backgroundColor: "wheat",
                                padding: "10px",
                                fontSize: "24px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            WOMEN
                        </li>
                        <div
                            style={{
                                display: "none",
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                backgroundColor: "wheat",
                                padding: "10px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Top Wear
                            </li>
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Bottom Wear
                            </li>
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Foot Wear
                            </li>
                        </div>
                    </ul>

                    <ul
                        id="clot13"
                        style={{
                            backgroundColor: "wheat",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            position: "relative",
                        }}
                    >
                        <li
                            style={{
                                backgroundColor: "wheat",
                                padding: "10px",
                                fontSize: "24px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            KIDS
                        </li>
                        <div
                            style={{
                                display: "none",
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                backgroundColor: "wheat",
                                padding: "10px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Top Wear
                            </li>
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Bottom Wear
                            </li>
                            <li
                                style={{
                                    backgroundColor: "wheat",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                Foot Wear
                            </li>
                        </div>
                    </ul>
                </div>

            </div>
        </span>
    );
}