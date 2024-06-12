import imgLogo from "../pictures/Logo.png";
import { useState } from 'react';
import '../style/structure/header.css';

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        // 在这里添加切换语言的逻辑,比如更新页面内容
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
        </div>
    );
};

export default Header;
