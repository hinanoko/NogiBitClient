import React, { useState } from 'react';
import "../style/page/gamble.css"
import img from "../pictures/shiori6Circle.jpg"

const Gamble = function ({ initialPercentage }) {
    const [percentage, setPercentage] = useState(initialPercentage);

    const handlePercentageChange = (e) => {
        const newPercentage = parseInt(e.target.value);
        if (!isNaN(newPercentage) && newPercentage >= 0 && newPercentage <= 100) {
            setPercentage(newPercentage);
        }
    };

    const idolName = "KuboShiori"

    const idolHistoryQuantity = 12

    return (
        <div>
            <div>
                <input
                    type="number"
                    value={percentage}
                    onChange={handlePercentageChange}
                    max="100"
                    min="0"
                />
            </div>
            <div className="my-component">
                <div className="gamble-image-container">
                    <img
                        src={img}
                        alt="Description"
                        className="my-component-image"
                    />
                </div>
                <div className="gamble-text-container" style={{ display: "flex" }}>
                    <span className="my-component-name">{idolName}</span>
                    <div style={{ marginLeft: "25%", fontSize: "23px", color: "#a8b90d" }}>{idolHistoryQuantity}</div>
                </div>
                <div className="gamble-bar-container">
                    <div
                        className="bar-filled"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Gamble;
