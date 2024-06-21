import React, { useState } from 'react';
import '../style/page/gamble.css';
import { Select } from 'antd';

const { Option } = Select;

const Gamble = function () {
    const [showModal, setShowModal] = useState(false);
    const [firstRow, setFirstRow] = useState(1);
    const [secondRow, setSecondRow] = useState(1);
    const [thirdRow, setThirdRow] = useState(1);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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

    const options = [];
    for (let i = 1; i <= 10; i++) {
        options.push({
            value: i,
            label: `${i}个`
        });
    }

    const generateCircles = (count) => {
        const circles = [];
        for (let i = 0; i < count; i++) {
            circles.push(
                <div className="gamble-rectangle" key={i}>
                    <div className="gamble-circle" onClick={handleButtonClick}>
                        +
                    </div>
                </div>
            );
        }
        return circles;
    };

    return (
        <div>
            <div className="select-container">
                <div className="select-item">
                    <div>第三排：</div>
                    <Select
                        defaultValue={1}
                        style={{ width: 120 }}
                        onChange={handleChangeFirstRow}
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
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="gamble-container">
                <div className="gamble-row">{generateCircles(firstRow)}</div>
                <div className="gamble-row">{generateCircles(secondRow)}</div>
                <div className="gamble-row">{generateCircles(thirdRow)}</div>
                {showModal && (
                    <div className="gamble-modal">
                        <div className="gamble-modal-content">
                            <span className="gamble-close-button" onClick={handleCloseModal}>&times;</span>
                            <p>这是一个弹窗</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gamble;