import imgLogo from "../pictures/Logo.png";
import { useState } from 'react';
import '../style/structure/header.css';
import { LoginOutlined, AlignRightOutlined, CloseOutlined } from '@ant-design/icons';

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        // 在这里添加切换语言的逻辑,比如更新页面内容
    };

    const userLogin = () => {
        console.log("click once");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.querySelector('.overlay').style.display = isMenuOpen ? 'none' : 'block';
    };

    const handleOverlayClick = () => {
        setIsMenuOpen(false);
        document.querySelector('.overlay').style.display = 'none';
    };

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
                <p style={{ marginRight: '10px', fontSize: '20px', color: "#b4b719" }}>Login</p>
                <LoginOutlined style={{ fontSize: '40px', color: "#b4b719" }} />
            </button>
            <button className="expand-button" onClick={toggleMenu}>
                <AlignRightOutlined style={{ fontSize: '40px', color: "#b4b719" }}></AlignRightOutlined>
                <p style={{ color: "#b4b719", marginTop: "5px" }}>menu</p>
            </button>

            <div
                className={`menu-container ${isMenuOpen ? 'open' : ''}`}
                style={{ right: isMenuOpen ? '0' : '-50%' }}
            >
                <button className="close-button" onClick={toggleMenu}>
                    <CloseOutlined style={{ fontSize: '40px', color: "#b4b719" }} />
                </button>
                {/* 在这里添加菜单内容 */}
                <button>Click Me</button>
            </div>

            <div className="overlay" onClick={handleOverlayClick}></div>

            <div className={`main-content ${isMenuOpen ? 'blurred' : ''}`}>
                {/* 主页面内容 */}
            </div>
        </div>
    );
};

export default Header;
