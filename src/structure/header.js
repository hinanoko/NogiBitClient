import imgLogo from "../pictures/Logo.png";
import { useState } from 'react';
import '../style/structure/header.css';
import { LoginOutlined } from '@ant-design/icons';
import { AlignRightOutlined } from '@ant-design/icons';

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        // 在这里添加切换语言的逻辑,比如更新页面内容
    };
    const userLogin = () => {
        console.log("click once")
    }
    return (
        <div className="header-container">
            <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="es">Español</option>
            </select>
            <div className="text-container">莱姆婊</div>
            <img src={imgLogo} alt="Logo" className="logo" />
            <button className="login-button" onClick={userLogin} style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '10px', fontSize: '20px', color: "#b4b719", }}>Login</p>
                <LoginOutlined style={{ fontSize: '40px', color: "#b4b719" }} />
            </button>
            <button className="expand-button">
                <AlignRightOutlined style={{ fontSize: '40px', color: "#b4b719" }}></AlignRightOutlined>
                <p style={{ color: "#b4b719", marginTop: "5px" }}>menu</p>
            </button>
        </div>
    );
};

export default Header;