import React from "react";
import "../styles/MedItem.css";

export default function MedItem() {
  return (
    <span className="med" style={{ borderRadius: "25%" }}>
      <div
        id="medfall"
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "1em",
          marginTop: "2em",
          borderRadius: "30%",
          backgroundColor: "wheat",
        }}
      >
        <a
          href="medical.html"
          target="_blank"
          style={{ textAlign: "center", width: "85%", marginLeft: "2em" }}
        >
          <h1
            id="med"
            style={{
              backgroundColor: "wheat",
              textAlign: "center",
              padding: "10px",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <b style={{ backgroundColor: "wheat" }}>MEDICAL</b>
          </h1>
          <hr />
        </a>
        <div
          id="med1"
          className="med"
          style={{
            display: "none",
            position: "absolute",
            top: "0",
            right: "0",
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
            <a
              id="medl"
              style={{ backgroundColor: "wheat" }}
              href="medical.html"
              target="_blank"
            >
              MEDICINES
            </a>
          </li>
          <li
            style={{
              backgroundColor: "wheat",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <a
              id="medl"
              style={{ backgroundColor: "wheat" }}
              href="medical.html"
              target="_blank"
            >
              MEDICAL EQUIPMENT
            </a>
          </li>
          <li
            style={{
              backgroundColor: "wheat",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <a
              id="medl"
              style={{ backgroundColor: "wheat" }}
              href="medical.html"
              target="_blank"
            >
              OTHER ESSENTIALS
            </a>
          </li>
        </div>
      </div>
    </span>
  );
}
