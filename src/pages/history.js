import React, { useState, useEffect } from 'react';
import "../style/page/history.css"
import { useNavigate, Routes, Route } from 'react-router-dom';
import PersonalHistory from './personal-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const memberData = [
    { id: "0001", name: "Ioki_Mao" },
    { id: "0002", name: "Ichinose_Miku" },
    { id: "0003", name: "Okamoto_Hina" },
    { id: "0004", name: "Ogawa_Aya" },
    { id: "0005", name: "Okuda_Iroha" },
    { id: "0006", name: "Kawasaki_Sakura" },
    { id: "0007", name: "Sugawara_Satsuki" },
    { id: "0008", name: "Tomisato_Nao" },
    { id: "0009", name: "Nakanishi_Aruno" },
    { id: "0010", name: "Inoue_Nagi" },
    { id: "0011", name: "Ikeda_Teresa" },
    { id: "0012", name: "Umezawa_Minami" },
    { id: "0013", name: "Kubo_Shiori" },
    { id: "0014", name: "Sato_Kaede" },
    { id: "0015", name: "Nakamura_Reno" },
    { id: "0016", name: "Mukai_Hazuki" },
    { id: "0017", name: "Yoda_Yuki" },
    { id: "0018", name: "Yoshida_Ayano_Christie" },
    { id: "0019", name: "Ito_Ririan" },
    { id: "0020", name: "Iwamoto_Renka" },
    { id: "0021", name: "Endo_Sakura" },
    { id: "0022", name: "Kaki_Haruka" },
    { id: "0023", name: "Kanagawa_Saya" },
    { id: "0024", name: "Shibata_Yuna" },
    { id: "0025", name: "Tamura_Mayu" },
    { id: "0026", name: "Tsutsui_Ayame" },
    { id: "0027", name: "Hayashi_Runa" },
    { id: "0028", name: "Matsuo_Miyu" },
    { id: "0029", name: "Yakubo_Mio" },
    { id: "0030", name: "Yumiki_Nao" },
    { id: "0031", name: "Kuromi_Haruka" },
    { id: "0032", name: "Sato_Rika" },
];

const History = function ({ handleUnitClick }) {
    const navigate = useNavigate()
    const [units, setUnits] = useState([]);

    useEffect(() => {
        fetchBlogCounts();
    }, []);

    const fetchBlogCounts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/history/count');
            const blogCounts = response.data;

            // Create an array with all 32 members, initial blog count 0
            const allUnits = memberData.map(member => ({
                idolId: member.id,
                idolName: member.name,
                idolHistoryQuantity: 0,
                percentage: 0
            }));

            // Update data from backend
            blogCounts.forEach(item => {
                const unit = allUnits.find(unit => unit.idolId === item.blogIdolId);
                if (unit) {
                    unit.idolHistoryQuantity = item.blogCount;
                }
            });

            // Find max blog count
            const maxBlogCount = Math.max(...allUnits.map(item => item.idolHistoryQuantity));

            // Calculate percentage
            allUnits.forEach(unit => {
                unit.percentage = (unit.idolHistoryQuantity / maxBlogCount) * 100;
            });

            setUnits(allUnits);
        } catch (error) {
            console.error('Error fetching blog counts:', error);
        }
    };

    const backToHome = () => {
        navigate('/')
    }

    const getMemberImage = function (memberId) {
        const paddedId = memberId.toString().padStart(4, '0');
        return require(`../pictures/member/${paddedId}.jpg`);
    }


    return (
        <div>
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            {units.map((unit, index) => (
                <div
                    className="unit-container"
                    key={index}
                    onClick={() => handleUnitClick(unit)}
                >
                    <div className="my-component">
                        <div className="history-image-container">
                            <img
                                src={getMemberImage(index + 1)}
                                alt={unit.idolName}
                                className="my-component-image"
                            />
                        </div>
                        <div className="history-text-container" style={{ display: "flex" }}>
                            <span className="my-component-name">{unit.idolName}</span>
                            <div style={{ marginLeft: "15%", marginRight: "5%", fontSize: "23px", color: "#a8b90d" }}>{unit.idolHistoryQuantity}</div>
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
        console.log(`Clicked on ${unit.idolName} with ID ${unit.idolId}`);
        navigate(`/history/${unit.idolId}`);
    };

    return (
        <Routes>
            <Route path="/" element={<History handleUnitClick={handleUnitClick} />} />
            <Route path="/:idolName" element={<PersonalHistory />} />
        </Routes>
    );
}

export default HistoryMain;