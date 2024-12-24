import React from "react";
import "../styles/EdItem.css";

export default function EdItem() {
    return (
        <span
            className="edu"
            style={{ backgroundColor: "wheat", marginTop: "20em" }}
        >
            <div
                style={{ backgroundColor: "#fbb03b", marginTop: "5em", }}
                className="eall"
            >
                <a
                    href="education.html"
                    id="eduh"
                    target="_blank"
                    style={{
                        backgroundColor: "wheat",
                        width: "23em",
                        zIndex: "5",
                        marginTop: "-3em",
                        marginBottom: "-8em",
                        marginLeft: "-2.5em",
                        paddingBottom: "2em"
                    }}
                >
                    <h1 id="edu" style={{ backgroundColor: "wheat", height: "2em", }}>
                        <b style={{ backgroundColor: "wheat", }}>EDUCATION</b>
                    </h1>
                    <hr />
                </a>
                <ul
                    id="edu1"
                    className="edu"
                    style={{
                        width: "90%",
                        backgroundColor: "black",
                        fontSize: "1.9em",
                        height: "18em",
                    }}
                >
                    <li style={{ backgroundColor: "wheat" }} className="eli">
                        <a
                            id="edul"
                            href="education.html"
                            target="_blank"
                            style={{ backgroundColor: "wheat" }}
                        >
                            STATIONERY
                        </a>
                    </li>
                    <li style={{ backgroundColor: "wheat" }} className="eli">
                        <a
                            id="edul"
                            href="education.html"
                            target="_blank"
                            style={{ backgroundColor: "wheat", height: "1em" }}
                            className="eli"
                        >
                            BAGS
                        </a>
                    </li>
                    <li style={{ backgroundColor: "wheat" }} className="eli">
                        <a
                            id="edul"
                            href="education.html"
                            target="_blank"
                            style={{ backgroundColor: "wheat", height: "1em" }}
                            className="eli"
                        >
                            {" "}
                            ESSENTIALS
                        </a>
                    </li>
                </ul>
            </div>
        </span>
    );
}
