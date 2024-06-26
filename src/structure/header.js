import imgLogo from "../pictures/Logo.png";
import { Modal, Form, Input, Button, Checkbox, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import '../style/structure/header.css';
import { useDispatch } from "react-redux";
import { changeToCn, changeToEn, changeToJp } from "../redux/actions/lang-acts";
import { LoginOutlined, AlignRightOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { TabPane } = Tabs;

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // 从 cookie 中读取语言设置
        const savedLanguage = Cookies.get('language');
        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
            dispatchLanguageChange(savedLanguage);
        }
    }, [dispatch]);

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        dispatchLanguageChange(language);
        setSelectedLanguage(language);
        // 更新 cookie
        Cookies.set('language', language, { expires: 1 });
    };

    const dispatchLanguageChange = (language) => {
        if (language === "en") {
            dispatch(changeToEn());
        } else if (language === "cn") {
            dispatch(changeToCn());
        } else if (language === "jp") {
            dispatch(changeToJp());
        }
    };

    const userLogin = () => {
        console.log("click once");
        setIsModalOpen(true)
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOverlayClick = () => {
        setIsMenuOpen(false);
    };

    const handleMenuItemClick = (action) => {
        action();
        setIsMenuOpen(false); // 关闭菜单
    };

    const handleCloseHeaderModal = () => {
        setIsModalOpen(false);
    };

    const handleRegister = (values) => {
        console.log('Register values:', values);
    };

    const handleLogin = (values) => {
        console.log('Login values:', values);
    };

    const translations = {
        en: {
            title: 'NogiMember',
            menu: 'Menu',
            login: 'Login',
            user: 'user',
            menuItems: [
                { name: 'Home', action: () => console.log('2') },
                { name: 'About', action: () => console.log('1') },
                { name: 'Contact', action: () => console.log('Contact action') },
                { name: 'History', action: () => console.log('History action') },
                { name: 'Rank', action: () => console.log('Rank action') },
                { name: 'Gamble', action: () => console.log('Gamble action') },
                { name: 'Mark', action: () => console.log('Mark action') }
            ],
        },
        cn: {
            title: '乃木宝',
            menu: '菜单',
            login: '登录',
            user: '用户',
            menuItems: [
                { name: '首页', action: () => console.log('2') },
                { name: '关于', action: () => console.log('1') },
                { name: '联系', action: () => console.log('Contact action') },
                { name: '光辉事迹', action: () => console.log('History action') },
                { name: '排名榜', action: () => console.log('Rank action') },
                { name: '猜轮盘', action: () => console.log('Gamble action') },
                { name: '季度打分', action: () => console.log('Mark action') }
            ],
        },
        jp: {
            title: '乃木番',
            menu: 'メニュー',
            login: 'ログイン',
            user: 'ユーザー',
            menuItems: [
                { name: 'ホーム', action: () => console.log('2') },
                { name: '約', action: () => console.log('1') },
                { name: '連絡', action: () => console.log('Contact action') },
                { name: '輝かしい歴史', action: () => console.log('History action') },
                { name: '等級', action: () => console.log('Rank action') },
                { name: '順位予測', action: () => console.log('Gamble action') },
                { name: 'メンバーのスコアリング', action: () => console.log('Mark action') }
            ],
        }
    };

    return (
        <div className="header-container">
            <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="cn">中文</option>
                <option value="jp">日本語</option>
            </select>
            <button className="user-button">
                <UserOutlined />
                <p>{translations[selectedLanguage].user}</p>
            </button>
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
                {/* 菜单项 */}
                {translations[selectedLanguage].menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="menu-item"
                        onClick={() => handleMenuItemClick(item.action)}
                    >
                        {item.name}
                        <div className="underline"></div>
                    </div>
                ))}
            </div>

            <div className={`overlay ${isMenuOpen ? 'show' : ''}`} onClick={handleOverlayClick}></div>

            <div className={`main-content ${isMenuOpen ? 'blurred' : ''}`}>
                {/* 主页面内容 */}
            </div>

            {isModalOpen && (
                <Modal
                    title="User Operation"
                    visible={isModalOpen}
                    onCancel={handleCloseHeaderModal}
                    footer={null}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Log In" key="1">
                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                onFinish={handleLogin}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your user name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="user name" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LoginOutlined />} placeholder="password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Register" key="2">
                            <Form
                                name="register"
                                onFinish={handleRegister}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your user name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="user name" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LoginOutlined />} placeholder="password" />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please determine password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('two passwords didn\'t match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password prefix={<LoginOutlined />} placeholder="determine your password" />
                                </Form.Item>
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree the document') }
                                    ]}
                                >
                                    <Checkbox>
                                        I have read and agree <a href="">document</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            )}
        </div>
    );
};

export default Header;
