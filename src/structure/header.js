import imgLogo from "../pictures/Logo.png";
import { useState } from 'react';
import '../style/structure/header.css';
import { useDispatch, useSelector } from "react-redux";
import { changeToCn, changeToEn, changeToJp } from "../redux/actions/lang-acts"
import { LoginOutlined, AlignRightOutlined, CloseOutlined } from '@ant-design/icons';

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch();

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        if (language === "en") {
            dispatch(changeToEn());
        } else if (language === "cn") {
            dispatch(changeToCn());
        } else if (language === "jp") {
            dispatch(changeToJp());
        }
        setSelectedLanguage(language);
    };

    const userLogin = () => {
        console.log("click once");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOverlayClick = () => {
        setIsMenuOpen(false);
    };

    const translations = {
        en: {
            title: 'NogiMember',
            menu: 'Menu',
            login: 'Login',
        },
        cn: {
            title: '莱姆婊',
            menu: '菜单',
            login: '登录',
        },
        jp: {
            title: '乃木番',
            menu: 'メニュー',
            login: 'ログイン',
        }
    };

    return (
        <div className="header-container">
            <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="cn">中文</option>
                <option value="jp">日本語</option>
            </select>
            <div className="text-container">{translations[selectedLanguage].title}</div>
            <img src={imgLogo} alt="Logo" className="logo" />
            <button className="login-button" onClick={userLogin}>
                <p>{translations[selectedLanguage].login}</p>
                <LoginOutlined />
            </button>
            <button className="expand-button" onClick={toggleMenu}>
                <AlignRightOutlined />
                <p>{translations[selectedLanguage].menu}</p>
            </button>

            <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleMenu}>
                    <CloseOutlined />
                </button>
                {/* 在这里添加菜单内容 */}

                <p>Content</p>
                <button>Click Me</button>
            </div>

            <div className={`overlay ${isMenuOpen ? 'show' : ''}`} onClick={handleOverlayClick}></div>

            <div className={`main-content ${isMenuOpen ? 'blurred' : ''}`}>
                {/* 主页面内容 */}
            </div>
        </div>
    );
};

export default Header;
