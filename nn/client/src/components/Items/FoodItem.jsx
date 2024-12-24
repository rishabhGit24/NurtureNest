import React from "react";
import "../styles/FoodItem.css";

export default function FoodItem() {
    return (
        <span className="food" style={{ borderRadius: "25%" }}>
            <div id="fall" style={{ width: "90%", display: "flex", flexDirection: "column", marginLeft: "1em", marginTop: "2em", borderRadius: "30%", backgroundColor: "wheat", }}>
                <a href="food.html" target="_blank" style={{ textAlign: "center", width: "85%", marginLeft: "2em", }}><h1 id="foodh" style={{ backgroundColor: "wheat", textAlign: "center" }}><b style={{ backgroundColor: "wheat", }}>FOOD</b></h1><hr /></a>
                <span className="finfo" style={{ backgroundColor: "wheat", }} >
                    <li style={{ backgroundColor: "wheat" }}><a id="foodl" style={{ backgroundColor: "wheat" }} href="food.html" target="_blank">PLATE MEALS</a></li>
                    <li style={{ backgroundColor: "wheat" }}><a id="foodl" style={{ backgroundColor: "wheat" }} href="food.html" target="_blank">BULK ITEMS</a></li>
                    <li style={{ backgroundColor: "wheat" }}><a id="foodl" style={{ backgroundColor: "wheat" }} href="food.html" target="_blank">RAW ITEMS</a></li>
                    <li style={{ backgroundColor: "wheat" }}><a id="foodl" style={{ backgroundColor: "wheat" }} href="food.html" target="_blank">PROCESSED ITEMS</a></li>
                </span>
            </div>
        </span>
    );
}