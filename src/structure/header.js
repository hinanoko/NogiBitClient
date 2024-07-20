import imgLogo from "../pictures/Logo.png";
import { Modal, Form, Input, Button, Checkbox, Tabs, message } from 'antd';
import { useState, useEffect } from 'react';
import '../style/structure/header.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeToCn, changeToEn, changeToJp } from "../redux/actions/lang-acts";
import { LoginOutlined, AlignRightOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setUser, clearUser } from '../redux/actions/user_acts';

const { TabPane } = Tabs;

const Header = function () {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector((state) => state.userHandler);

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

    const userLogout = () => {
        dispatch(clearUser());
        message.success('Logout successful');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOverlayClick = () => {
        setIsMenuOpen(false);
    };

    const handleMenuItemClick = (action) => {
        const actionResult = action();
        if (actionResult === "Mark action") {
            navigate('/mark');
        } else if (actionResult === "Gamble action") {
            navigate('/gamble')
        } else if (actionResult === "Rank action") {
            navigate('/rank')
        } else if (actionResult === "History action") {
            navigate('/history')
        } else {

        }
        setIsMenuOpen(false); // 关闭菜单
    };

    const handleCloseHeaderModal = () => {
        setIsModalOpen(false);
    };

    const handleUserIconClick = () => {
        setIsCoinModalOpen(true);
    };

    const handleCloseCoinsModal = () => {
        setIsCoinModalOpen(false);
    };

    const handleRegister = (values) => {
        const registerUser = {
            user_name: values.username,
            user_password: values.password
        }
        console.log(registerUser)

        axios.post('http://localhost:8081/user', registerUser)
            .then(response => {
                console.log(response.data)
                message.success('Registration successful');
                setIsModalOpen(false);  // 关闭模态框
            })
            .catch(error => {
                console.log(error)
                message.error('Registration failed');
            })
    };

    const handleLogin = (values) => {
        const loginUser = {
            user_name: values.username,
            user_password: values.password
        }

        axios.post('http://localhost:8081/user/login', loginUser)
            .then(response => {
                console.log(response.data)
                if (response.data.message === 'Login successful') {
                    const userData = {
                        userName: values.username,
                        userPassword: values.password,
                        userToken: response.data.token,
                        userCoin: response.data.coins
                    };
                    dispatch(setUser(userData));
                    message.success('Login successful')
                    setIsModalOpen(false)
                } else {
                    message.error('Login failed')
                }
            })
            .catch(error => {
                console.log(error)
            })
        console.log(loginUser)
    };

    const translations = {
        en: {
            title: 'NogiMember',
            menu: 'Menu',
            login: 'Login',
            logout: 'Logout',
            user: 'user',
            menuItems: [
                { name: 'Home', action: () => { console.log('2'); return 'Home action'; } },
                { name: 'About', action: () => { console.log('1'); return 'About action'; } },
                { name: 'Contact', action: () => { console.log('Contact action'); return 'Contact action'; } },
                { name: 'History', action: () => { console.log('History action'); return 'History action'; } },
                { name: 'Rank', action: () => { console.log('Rank action'); return 'Rank action'; } },
                { name: 'Gamble', action: () => { console.log('Gamble action'); return 'Gamble action'; } },
                { name: 'Mark', action: () => { console.log('Mark action'); return 'Mark action'; } }
            ],
        },
        cn: {
            title: '乃木宝',
            menu: '菜单',
            login: '登录',
            logout: '退出',
            user: '用户',
            menuItems: [
                { name: '首页', action: () => { console.log('2'); return 'Home action'; } },
                { name: '关于', action: () => { console.log('1'); return 'About action'; } },
                { name: '联系', action: () => { console.log('Contact action'); return 'Contact action'; } },
                { name: '光辉事迹', action: () => { console.log('History action'); return 'History action'; } },
                { name: '排名榜', action: () => { console.log('Rank action'); return 'Rank action'; } },
                { name: '猜轮盘', action: () => { console.log('Gamble action'); return 'Gamble action'; } },
                { name: '季度打分', action: () => { console.log('Mark action'); return 'Mark action'; } }
            ],
        },
        jp: {
            title: '乃木番',
            menu: 'メニュー',
            login: 'ログイン',
            logout: 'ログアウト',
            user: 'ユーザー',
            menuItems: [
                { name: 'ホーム', action: () => { console.log('2'); return 'Home action'; } },
                { name: '約', action: () => { console.log('1'); return 'About action'; } },
                { name: '連絡', action: () => { console.log('History action'); return 'History action'; } },
                { name: '輝かしい歴史', action: () => { console.log('History action'); return 'History action'; } },
                { name: '等級', action: () => { console.log('Rank action'); return 'Rank action'; } },
                { name: '順位予測', action: () => { console.log('Gamble action'); return 'Gamble action'; } },
                { name: 'メンバーのスコアリング', action: () => { console.log('Mark action'); return 'Mark action'; } }
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
            <button className="user-button" onClick={handleUserIconClick}>
                <UserOutlined />
                <p>{user.isLoggedIn ? user.userName : translations[selectedLanguage].user}</p>
            </button>
            <div className="text-container">{translations[selectedLanguage].title}</div>
            <img src={imgLogo} alt="Logo" className="logo" />
            <button className="login-button" onClick={user.isLoggedIn ? userLogout : userLogin}>
                <p>{user.isLoggedIn ? translations[selectedLanguage].logout : translations[selectedLanguage].login}</p>
                {user.isLoggedIn ? <LogoutOutlined /> : <LoginOutlined />}
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


            {isCoinModalOpen && (
                <Modal
                    title="Remaining Coins"
                    visible={isCoinModalOpen}
                    onCancel={handleCloseCoinsModal}
                    footer={[
                        <Button key="close" onClick={handleCloseCoinsModal}>
                            Close
                        </Button>
                    ]}
                >
                    <p>你剩余的金币数量：{user.coins}</p> {/* 这里假设 coins 是从状态或者 Redux 中获取的 */}
                </Modal>
            )}
        </div>
    );
};

export default Header;
