import "../style/page/mark.css";
import img from "../pictures/shiori6Circle.jpg"; // Replace with actual image URLs
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import smallRocket from "../icons/smallRocket_transparent.png";
import middleRocket from "../icons/middleRocket_transparent.png";
import bigRocket from "../icons/bigRocket_transparent.png";
import smallEgg from "../icons/smallEgg_transparent.png";
import middleEgg from "../icons/middleEgg_transparent.png";
import bigEgg from "../icons/bigEgg_transparent.png";


const members = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `成员 ${i + 1}`,
    photo: img, // Placeholder image, replace with actual URLs
    leftBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
    rightBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
}));

const Mark = function () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null)

    const navigate = useNavigate()

    const backToHome = () => {
        navigate('/')
    }
    function clickToPanel(member) {
        setSelectedMember(member);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedMember(null);
    }

    function handleIconClick(iconType) {
        alert(`Clicked on ${iconType}`);
    }
    return (
        <div>
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            <div className="mark-group-position">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="mark-rectangle" onClick={clickToPanel}>
                        <img
                            src={img}
                            className="mark-circle-photo"
                            alt={`Member ${index + 1}`}
                        />
                        <div className="mark-member-name">shiori</div>
                    </div>
                ))}
            </div>

            <div className="mark-group-position" style={{ marginTop: "-28%" }}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="mark-rectangle" onClick={clickToPanel}>
                        <img
                            src={img}
                            className="mark-circle-photo"
                            alt={`Member ${index + 1}`}
                        />
                        <div className="mark-member-name">shiori</div>
                    </div>
                ))}
            </div>

            <div className="mark-group-position" style={{ marginTop: "-28%" }}>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="mark-rectangle" onClick={clickToPanel}>
                        <img
                            src={img}
                            className="mark-circle-photo"
                            alt={`Member ${index + 1}`}
                        />
                        <div className="mark-member-name">shiori</div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "-22%" }}>
                {members.map((member) => (
                    <div key={member.id} className="mark-member-container">
                        <div className="mark-bar-container-left">
                            <div
                                className="mark-bar-filled-left"
                                style={{ width: `${member.leftBarPercentage}%` }} // 使用反引号和模板字符串
                            ></div>
                        </div>

                        <div className="mark-bar-percentage" style={{ marginRight: "3%" }}>
                            {member.leftBarPercentage}%
                        </div>

                        <div className="mark-image-container">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="mark-component-image"
                            />
                            <p>{member.name}</p>
                        </div>

                        <div className="mark-bar-percentage" style={{ marginLeft: "3%" }}>
                            {member.rightBarPercentage}%
                        </div>

                        <div className="mark-bar-container-right">
                            <div
                                className="mark-bar-filled-right"
                                style={{ width: `${member.rightBarPercentage}%` }} // 使用反引号和模板字符串
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Member Reward</h2>
                        <div className="icon-row">
                            <div className="icon-container">
                                <img
                                    src={smallRocket}
                                    alt={selectedMember.name}
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('smallRocket')}
                                />
                                <p className="icon-text rocket-text">+3 points</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={middleRocket}
                                    alt={selectedMember.name}
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('middleRocket')}
                                />
                                <p className="icon-text rocket-text">+3 points</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={bigRocket}
                                    alt={selectedMember.name}
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('bigRocket')}
                                />
                                <p className="icon-text rocket-text">+3 points</p>
                            </div>
                        </div>
                        <div className="icon-row">
                            <div className="icon-container">
                                <img
                                    src={smallEgg}
                                    alt={selectedMember.name}
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('smallEgg')}
                                />
                                <p className="icon-text egg-text">-3 points</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={middleEgg}
                                    alt={selectedMember.name}
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('middleEgg')}
                                />
                                <p className="icon-text egg-text">-3 points</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={bigEgg}
                                    alt={selectedMember.name}
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('bigEgg')}
                                />
                                <p className="icon-text egg-text">-3 points</p>
                            </div>
                        </div>
                        <p>{selectedMember.name}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Mark;