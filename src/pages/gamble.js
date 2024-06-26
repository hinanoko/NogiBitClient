import React, { useState } from 'react';
import '../style/page/gamble.css';
import { Select, Button } from 'antd';
import { DoubleRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const members = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `成员 ${i + 1}`,
    photo: `https://via.placeholder.com/100?text=${i + 1}` // Placeholder images for members
}));

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

    const backToHome = () => {
        navigate('/')
    }

    const handleButtonClick = (index) => {
        setSelectedCircle(index);
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
        setShowModal(true);
        setIsModalOpen(true);
    };

    const handleMemberClick = (member) => {
        if (selectedCircle !== null) {
            const newCircles = [...circles];
            newCircles[selectedCircle] = member;
            setCircles(newCircles);
            setShowModal(false);
            setIsModalOpen(false);
        } else if (modalType === 'cPosition') {
            setCPosition(member);
            setShowModal(false);
            setIsModalOpen(false);
        } else if (modalType === 'underCPosition') {
            setUnderCPosition(member);
            setShowModal(false);
            setIsModalOpen(false);
        }
    };

    const handleConfirm = () => {
        // 这里可以添加确认逻辑，比如发送数据到服务器
        console.log('Confirmed selections:', { cPosition, underCPosition });
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
            const index = row === '第三排' ? i : row === '第二排' ? 10 + i : 20 + i;
            const member = circles[index];
            rowCircles.push(
                <div className="gamble-rectangle" key={index}>
                    <div className="gamble-circle" onClick={() => handleButtonClick(index)}>
                        {member ? (
                            <img
                                src={member.photo}
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
                    <div>第三排：</div>
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
                    <div>第一排：</div>
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
                <div className="gamble-row">{generateCircles(firstRow, '第三排')}</div>
                <div className="gamble-row">{generateCircles(secondRow, '第二排')}</div>
                <div className="gamble-row">{generateCircles(thirdRow, '第一排')}</div>
                {showModal && (
                    <div className="gamble-modal">
                        <div className="gamble-modal-content">
                            <span className="gamble-close-button" onClick={handleCloseModal}>&times;</span>
                            <div className="member-container">
                                {members.map(member => (
                                    <div key={member.id} className="member-item">
                                        <img
                                            src={member.photo}
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
                <button onClick={handleConfirm} className="confirm-button" disabled={isModalOpen}>确认</button>
            </div>
        </div>
    );
}

export default Gamble;
