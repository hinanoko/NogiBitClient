import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/page/gamble.css';
import { useSelector } from "react-redux";
import { Select, Button } from 'antd';
import { DoubleRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

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

const members = Array.from({ length: 32 }, (_, i) => {
    const memberId = (i + 1).toString().padStart(4, '0');
    const member = memberData.find(m => m.id === memberId);
    return {
        id: i + 1,
        name: member ? member.name : `成员 ${i + 1}`,
        photo: `https://via.placeholder.com/100?text=${i + 1}` // Placeholder images for members
    };
});

const Gamble = function () {
    const [showModal, setShowModal] = useState(false);
    const [firstRow, setFirstRow] = useState(1);
    const [secondRow, setSecondRow] = useState(1);
    const [thirdRow, setThirdRow] = useState(1);
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [circles, setCircles] = useState(Array(30).fill(null));
    const [cPosition, setCPosition] = useState(null);
    const [underCPosition, setUnderCPosition] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const navigate = useNavigate()

    const user = useSelector((state) => state.userHandler);

    const backToHome = () => {
        navigate('/')
    }

    const handleButtonClick = (index) => {
        setSelectedCircle(index);
        setModalType('circle');  // 新增这行
        setShowModal(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIsModalOpen(false);
    };

    const handleChangeFirstRow = (value) => {
        setFirstRow(value);
        console.log(`First row selected ${value}`);
    };

    const handleChangeSecondRow = (value) => {
        setSecondRow(value);
        console.log(`Second row selected ${value}`);
    };

    const handleChangeThirdRow = (value) => {
        setThirdRow(value);
        console.log(`Third row selected ${value}`);
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setSelectedCircle(null);  // 新增这行，确保在选择 C position 时重置 selectedCircle
        setShowModal(true);
        setIsModalOpen(true);
    };

    const getMemberImage = function (memberId) {
        const paddedId = memberId.toString().padStart(4, '0');
        return require(`../pictures/member/${paddedId}.jpg`);
    }

    const handleMemberClick = (member) => {
        if (modalType === 'cPosition') {
            setCPosition(member);
            setShowModal(false);
            setIsModalOpen(false);
        } else if (modalType === 'underCPosition') {
            setUnderCPosition(member);
            setShowModal(false);
            setIsModalOpen(false);
        } else if (selectedCircle !== null) {
            const newCircles = [...circles];
            newCircles[selectedCircle] = member;
            setCircles(newCircles);
            setShowModal(false);
            setIsModalOpen(false);
            setSelectedCircle(null);  // 重置选中的圆圈
        }
    };

    useEffect(() => {
        const fetchGambleData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/gamble/byName?name=${user.userName}`, {
                    headers: { 'Authorization': user.userToken }
                });

                if (response.data.message === "success" && response.data.data.serviceMessage === "success") {
                    const gambleData = response.data.data.data;

                    // 更新 C position
                    if (gambleData.senBatuC) {
                        const cPositionMember = members.find(m => m.id === parseInt(gambleData.senBatuC));
                        setCPosition(cPositionMember);
                    }

                    // 更新 Under C position
                    if (gambleData.underC) {
                        const underCPositionMember = members.find(m => m.id === parseInt(gambleData.underC));
                        setUnderCPosition(underCPositionMember);
                    }

                    // 更新圆圈中的成员
                    const newCircles = Array(30).fill(null);
                    ['thirdRowMember', 'secondRowMember', 'firstRowMember'].forEach((rowKey, rowIndex) => {
                        const memberIds = gambleData[rowKey].split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
                        memberIds.forEach((id, index) => {
                            const member = members.find(m => m.id === id);
                            if (member) {
                                newCircles[rowIndex * 10 + index] = member;
                            }
                        });
                    });
                    setCircles(newCircles);

                    // 更新行数
                    setFirstRow(gambleData.firstRowNum);
                    setSecondRow(gambleData.secondRowNum);
                    setThirdRow(gambleData.thirdRowNum);
                }
            } catch (error) {
                console.error('Error fetching gamble data:', error);
            }
        };

        fetchGambleData();
    }, [user.userName, user.userToken]);

    const handleConfirm = () => {
        const thirdRowMembers = circles.slice(0, 10).map(member => member ? member.id : null);
        const secondRowMembers = circles.slice(10, 20).map(member => member ? member.id : null);
        const firstRowMembers = circles.slice(20, 30).map(member => member ? member.id : null);

        const thirdRowCount = thirdRowMembers.filter(member => member !== null).length;
        const secondRowCount = secondRowMembers.filter(member => member !== null).length;
        const firstRowCount = firstRowMembers.filter(member => member !== null).length;

        const thirdRowMembersStr = thirdRowMembers.join(',');
        const secondRowMembersStr = secondRowMembers.join(',');
        const firstRowMembersStr = firstRowMembers.join(',');

        const { userToken, userName } = user;

        const gamble = {
            userName: userName,
            determine: "YES",
            thirdRowNum: thirdRowCount,
            secondRowNum: secondRowCount,
            firstRowNum: firstRowCount,
            thirdRowMember: thirdRowMembersStr,
            secondRowMember: secondRowMembersStr,
            firstRowMember: firstRowMembersStr,
            senBatuC: cPosition ? cPosition.id.toString() : null,
            underC: underCPosition ? underCPosition.id.toString() : null
        };

        console.log(gamble)

        axios.post('http://localhost:8081/gamble', gamble, {
            headers: {
                'Authorization': userToken
            }
        })
            .then(response => {
                console.log('Response:', response);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    console.log('Response headers:', error.response.headers);
                }
            });
    };


    const options = [];
    for (let i = 1; i <= 10; i++) {
        options.push({
            value: i,
            label: `${i}个`
        });
    }

    const generateCircles = (count, row) => {
        const rowCircles = [];
        for (let i = 0; i < count; i++) {
            const index = row === '第一排' ? 20 + i : row === '第二排' ? 10 + i : i;
            const member = circles[index];
            rowCircles.push(
                <div className="gamble-rectangle" key={index}>
                    <div className="gamble-circle" onClick={() => handleButtonClick(index)}>
                        {member ? (
                            <img
                                src={getMemberImage(member.id)}
                                alt={member.name}
                                className="member-photo circle-photo"
                            />
                        ) : (
                            '+'
                        )}
                    </div>
                    <div className="gamble-member-name">
                        {member ? member.name : `成员 ${row}-${i + 1}`}
                    </div>
                </div>
            );
        }
        return rowCircles;
    };

    return (
        <div>
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            <div className="select-container">
                <div className="select-item">
                    <div>第一排：</div>
                    <Select
                        defaultValue={1}
                        style={{ width: 120 }}
                        onChange={handleChangeFirstRow}
                        disabled={isModalOpen}
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="select-item">
                    <div>第二排：</div>
                    <Select
                        defaultValue={1}
                        style={{ width: 120 }}
                        onChange={handleChangeSecondRow}
                        disabled={isModalOpen}
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="select-item">
                    <div>第三排：</div>
                    <Select
                        defaultValue={1}
                        style={{ width: 120 }}
                        onChange={handleChangeThirdRow}
                        disabled={isModalOpen}
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="gamble-container-1">
                <div className="gamble-row">{generateCircles(thirdRow, '第三排')}</div>
                <div className="gamble-row">{generateCircles(secondRow, '第二排')}</div>
                <div className="gamble-row">{generateCircles(firstRow, '第一排')}</div>
                {showModal && (
                    <div className="gamble-modal">
                        <div className="gamble-modal-content">
                            <span className="gamble-close-button" onClick={handleCloseModal}>&times;</span>
                            <div className="member-container">
                                {members.map(member => (
                                    <div key={member.id} className="member-item">
                                        <img
                                            src={getMemberImage(member.id)}
                                            alt={member.name}
                                            className="member-photo"
                                            onClick={() => handleMemberClick(member)}
                                        />
                                        <div className="member-name">{member.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="gamble-expect-area">
                <p className="gamble-title-font">Expect Area</p>
                <div className="gamble-mark-line"></div>
                <div className="gamble-position-selection">
                    <p>C position:</p>
                    <div className='gamble-center-select' onClick={() => handleOpenModal('cPosition')} disabled={isModalOpen}><p>Choose</p></div>
                    <DoubleRightOutlined style={{ marginLeft: "2%", fontSize: "300%" }} />
                    <div className='gamble-position-selection-name' style={{ marginLeft: "3%" }}>{cPosition && <p>{cPosition.name}</p>}</div>
                </div>
                <div className="gamble-position-selection">
                    <p>Under C position:</p>
                    <div className='gamble-center-select' onClick={() => handleOpenModal('underCPosition')} disabled={isModalOpen}><p>Choose</p></div>
                    <DoubleRightOutlined style={{ marginLeft: "2%", fontSize: "300%" }} />
                    <div className='gamble-position-selection-name' style={{ marginLeft: "3%" }}>{underCPosition && <p>{underCPosition.name}</p>}</div>
                </div>
                <button onClick={handleConfirm} className="confirm-button" disabled={isModalOpen}>Confirm and Submit</button>
            </div>
        </div>
    );
}

export default Gamble;
