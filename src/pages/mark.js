import "../style/page/mark.css";
import img from "../pictures/shiori6Circle.jpg"; // Replace with actual image URLs
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOutlined } from '@ant-design/icons';
import smallRocket from "../icons/smallRocket_transparent.png";
import axios from 'axios';
import middleRocket from "../icons/middleRocket_transparent.png";
import bigRocket from "../icons/bigRocket_transparent.png";
import smallEgg from "../icons/smallEgg_transparent.png";
import middleEgg from "../icons/middleEgg_transparent.png";
import bigEgg from "../icons/bigEgg_transparent.png";
import { changeCoins } from "../redux/actions/user_acts";

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

const members = memberData.map(member => ({
    id: member.id,
    name: member.name,
    photo: img, // Placeholder image, replace with actual URLs
    leftBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
    rightBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
}));


const Mark = function () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [marks, setMarks] = useState([]);
    const [message, setMessage] = useState('');
    const [processedMembers, setProcessedMembers] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userHandler);

    const backToHome = () => {
        navigate('/');
    }

    const fetchMarks = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8081/mark');
            if (response.status === 200) {
                const fetchedMarks = response.data.body;
                setMessage(response.data.message);

                if (fetchedMarks && fetchedMarks.length > 0) {
                    const maxPosiMark = Math.max(...fetchedMarks.map(m => m.memberPosiMark));
                    const maxNogiMark = Math.max(...fetchedMarks.map(m => m.memberNogiMark));

                    const processedMembers = fetchedMarks.map(mark => ({
                        id: mark.memberId,
                        name: mark.memberName,
                        photo: img, // 使用占位图片
                        leftBarPercentage: maxNogiMark > 0 ? (mark.memberNogiMark / maxNogiMark) * 100 : 0,
                        rightBarPercentage: maxPosiMark > 0 ? (mark.memberPosiMark / maxPosiMark) * 100 : 0,
                        leftBarValue: mark.memberNogiMark,
                        rightBarValue: mark.memberPosiMark
                    }));

                    setProcessedMembers(processedMembers);
                } else {
                    setProcessedMembers([]);
                }
            } else {
                setMessage('Failed to fetch marks');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setProcessedMembers([]);
        }
    }, []);

    useEffect(() => {
        fetchMarks();
    }, [fetchMarks]);

    function clickToPanel(member) {
        console.log(member);
        setSelectedMember({ name: member, score: null });
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedMember(null);
    }

    function handleIconClick(iconType, score, name) {
        const { userToken, userName } = user;
        var coins = user.coins;
        var needCoins = Math.abs(score);

        if (needCoins > coins) {
            alert("Your coins are not enough");
        } else {
            coins = coins - needCoins;
            axios.put('http://localhost:8081/user/updateCoins', {
                userName: userName,
                needCoins: needCoins,
                token: userToken,
                memberId: name,
                memberMark: score
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data) {
                        dispatch(changeCoins(coins));
                        fetchMarks(); // 重新获取最新数据
                        alert(`Successfully ${score > 0 ? 'added' : 'deducted'} ${Math.abs(score)} points for ${name}`);
                    } else {
                        alert("Failed to update coins");
                    }
                })
                .catch(error => {
                    console.error("There was an error updating the coins!", error);
                    alert("There was an error updating the coins!");
                });
        }
        closeModal(); // 关闭模态框
    }

    const underMember = ["0003", "0005", "0014", "0015", "0016", "0018", "0019", "0024", "0027", "0028", "0029", "0031", "0032"];

    const UnderMemberGrid = ({ startIndex, count }) => (
        <div className="mark-group-position" style={{ marginTop: count < 8 ? "-28%" : undefined }}>
            {[...Array(count)].map((_, index) => {
                const memberIndex = startIndex + index;
                const memberNumber = underMember[memberIndex];
                return (
                    <div key={memberIndex} className="mark-rectangle" onClick={() => clickToPanel(memberNumber)}>
                        <img
                            src={img}
                            className="mark-circle-photo"
                            alt={`Member ${memberIndex + 1}`}
                        />
                        <div className="mark-member-name">{memberNumber}</div>
                    </div>
                );
            })}
        </div>
    );

    const UnderMemberGridContainer = () => (
        <div>
            <UnderMemberGrid startIndex={0} count={8} />
            <UnderMemberGrid startIndex={8} count={5} />
        </div>
    )

    const onMember = ["0026", "0007", "0025", "0009", "0006", "0030", "0008", "0023",
        "0017", "0001", "0013", "0012", "0002", "0020",
        "0021", "0004", "0010", "0011", "0022"];

    const OnMemberGrid = ({ startIndex, count }) => (
        <div className="mark-group-position" style={{ marginTop: count < 8 ? "-28%" : undefined }}>
            {[...Array(count)].map((_, index) => {
                const memberIndex = startIndex + index;
                const memberNumber = onMember[memberIndex];
                return (
                    <div key={memberIndex} className="mark-rectangle" onClick={() => clickToPanel(memberNumber)}>
                        <img
                            src={img}
                            className="mark-circle-photo"
                            alt={`Member ${memberIndex + 1}`}
                        />
                        <div className="mark-member-name">{memberNumber}</div>
                    </div>
                );
            })}
        </div>
    );

    const OnMemberGridContainer = () => (
        <div>
            <OnMemberGrid startIndex={0} count={8} />
            <OnMemberGrid startIndex={8} count={6} />
            <OnMemberGrid startIndex={14} count={5} />
        </div>
    );

    return (
        <div>
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            <div>
                <div className="yellow-line"></div>

                <p>Senbatu Member:</p>

                <OnMemberGridContainer></OnMemberGridContainer>

                <div className="yellow-line" style={{ marginTop: "-28%" }}></div>
                <p>Under Member:</p>

                <UnderMemberGridContainer></UnderMemberGridContainer>

            </div>

            <div style={{ marginTop: "-18%" }}>
                {processedMembers.map((member) => (
                    <div key={member.id} className="mark-member-container">
                        <div className="mark-bar-container-left">
                            <div
                                className="mark-bar-filled-left"
                                style={{ width: `${member.leftBarPercentage}%` }}
                            ></div>
                        </div>

                        <div className="mark-bar-percentage" style={{ marginRight: "3%" }}>
                            {member.leftBarValue}
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
                            {member.rightBarValue}
                        </div>

                        <div className="mark-bar-container-right">
                            <div
                                className="mark-bar-filled-right"
                                style={{ width: `${member.rightBarPercentage}%` }}
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
                                    alt="smallRocket"
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('smallRocket', 3, selectedMember.name)}
                                />
                                <p className="icon-text rocket-text">+3 points/3 coins</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={middleRocket}
                                    alt="middleRocket"
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('middleRocket', 5, selectedMember.name)}
                                />
                                <p className="icon-text rocket-text">+5 points/5 coins</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={bigRocket}
                                    alt="bigRocket"
                                    className="modal-photo rocket"
                                    onClick={() => handleIconClick('bigRocket', 10, selectedMember.name)}
                                />
                                <p className="icon-text rocket-text">+10 points/10 coins</p>
                            </div>
                        </div>
                        <div className="icon-row">
                            <div className="icon-container">
                                <img
                                    src={smallEgg}
                                    alt="smallEgg"
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('smallEgg', -3, selectedMember.name)}
                                />
                                <p className="icon-text egg-text">-3 points/3 coins</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={middleEgg}
                                    alt="middleEgg"
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('middleEgg', -5, selectedMember.name)}
                                />
                                <p className="icon-text egg-text">-5 points/5 coins</p>
                            </div>
                            <div className="icon-container">
                                <img
                                    src={bigEgg}
                                    alt="bigEgg"
                                    className="modal-photo egg"
                                    onClick={() => handleIconClick('bigEgg', -10, selectedMember.name)}
                                />
                                <p className="icon-text egg-text">-10 points/10 coins</p>
                            </div>
                        </div>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mark;