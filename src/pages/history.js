import React, { useState } from 'react';
import "../style/page/history.css"
import img from "../pictures/shiori6Circle.jpg"
import { useNavigate, Routes, Route } from 'react-router-dom';
import PersonalHistory from './personal-history';
import { ArrowLeftOutlined } from '@ant-design/icons';

const History = function ({ initialPercentage, handleUnitClick }) {
    const navigate = useNavigate()

    const backToHome = () => {
        navigate('/')
    }

    const [percentage, setPercentage] = useState(initialPercentage);

    const handlePercentageChange = (e) => {
        const newPercentage = parseInt(e.target.value);
        if (!isNaN(newPercentage) && newPercentage >= 0 && newPercentage <= 100) {
            setPercentage(newPercentage);
        }
    };

    const getMemberImage = function (memberId) {
        const paddedId = memberId.toString().padStart(4, '0');
        return require(`../pictures/member/${paddedId}.jpg`);
    }

    const units = Array.from({ length: 32 }, (_, index) => ({
        idolName: `Idol ${index + 1}`,
        idolHistoryQuantity: Math.floor(Math.random() * 100),
        percentage: Math.floor(Math.random() * 101),
    }));

    return (
        <div>
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            {units.map((unit, index) => (
                <div
                    className="unit-container"
                    key={index}
                    onClick={() => handleUnitClick(unit)}
                //onMouseEnter={(e) => e.currentTarget.classList.add('unit-hover')}
                //onMouseLeave={(e) => e.currentTarget.classList.remove('unit-hover')}
                >
                    <div className="my-component">
                        <div className="history-image-container">
                            <img
                                src={getMemberImage(index + 1)}
                                alt="Description"
                                className="my-component-image"
                            />
                        </div>
                        <div className="history-text-container" style={{ display: "flex" }}>
                            <span className="my-component-name">{unit.idolName}</span>
                            <div style={{ marginLeft: "25%", fontSize: "23px", color: "#a8b90d" }}>{unit.idolHistoryQuantity}</div>
                        </div>
                        <div className="history-bar-container">
                            <div
                                className="bar-filled"
                                style={{ width: `${unit.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const HistoryMain = function () {
    const navigate = useNavigate();

    const handleUnitClick = (unit) => {
        console.log(`Clicked on ${unit.idolName}`);
        navigate(`/history/${unit.idolName}`);
    };

    return (
        <Routes>
            <Route path="/" element={<History handleUnitClick={handleUnitClick} />} />
            <Route path="/:idolName" element={<PersonalHistory />} />
        </Routes>
    );
}


export default HistoryMain