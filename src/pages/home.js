import React from 'react';
import "../style/page/home.css"
import wallPaper1 from "../pictures/wallpaper2.webp"
import wallPaper2 from "../pictures/wallpaper3.webp"
import wallPaper3 from "../pictures/wallpaper4.webp"
import wallPaper4 from "../pictures/wallpaper5.webp"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { LineChartOutlined, ReadOutlined, FundProjectionScreenOutlined, GiftOutlined, CrownOutlined } from '@ant-design/icons';
import ImageCarousel from './test';
import MainBigPhoto3 from "../pictures/MainBigPhoto3.png"
import MainBigPhoto from "../pictures/MainBigPhoto.png"
import MainBigPhoto2 from "../pictures/MainBigPhoto2.jpg"
import MainSmallPhoto2 from "../pictures/MainSmallPhoto2.jpg"

import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // 确保引入 Ant Design 样式

const Home = function () {
    const navigate = useNavigate();

    const language = useSelector(state => state.languageHandler.language)

    console.log(language)

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowBackToTop(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const goToHistory = function () {
        navigate('/history'); // 跳转到 About 页面
    }

    const goToRank = function () {
        navigate('/rank')
    }

    const goToGamble = function () {
        navigate('/gamble')
    }

    const goToMark = function () {
        navigate('/mark')
    }

    const handleNewsClick = function () {
        navigate('/history');
    }

    const carouselImages = [
        MainBigPhoto3,
        MainBigPhoto,
        MainBigPhoto2,
        MainSmallPhoto2
    ];

    const translations = {
        en: {
            history: 'History',
            rank: 'rank',
            gamble: 'gamble',
            mark: 'mark',
            enter: 'enter',
            backToTop: 'Back To Top',
            historyText: 'Glory History Record: took your inner magnifier, record every history of each member you like',
            rankText: 'Scoring ranking: Crazy scoring without any worries, from 0 to 10 for you to choose from, don\'t forget to leave your beautiful comments',
            gambleText: 'Cyber Casino: Guess who the next C-spot is',
            markText: 'member rank, update member\'s order every single, you can use coin to increase the order of the member you like',
            future: 'future',
        },
        cn: {
            history: '光辉事迹',
            rank: '排名榜',
            gamble: '猜轮盘',
            mark: '季度打分',
            enter: '进入详情',
            backToTop: '回到顶部',
            historyText: '光辉历史记录：抱着赛博放大镜，记录下您心爱的成员的每一个讨人厌的历史',
            rankText: '打分排名：毫无顾忌的疯狂打分，从0到10供君选择，别忘了留下您的优美评论',
            gambleText: '赛博赌场：猜猜谁是下一个C位',
            markText: '成员排名：每单曲同步更新成员排名，可以通过使用莱姆币让您心爱的成员一飞冲天',
            future: '未来'
        },
        jp: {
            history: "輝かしい歴史",
            rank: '等級',
            gamble: '順位予測',
            mark: 'メンバーのスコアリング',
            enter: 'に入る',
            backToTop: 'トップに戻る',
            historyText: '栄光の歴史：あなたの心の拡大鏡を持って、あなたの好きな会員一人一人の歴史を記録します',
            rankText: '採点順位：遠慮のないクレイジーな採点、0から10まであなたの選択、あなたの美しいコメントを残すことを忘れないでください',
            gambleText: 'セブカジノ：誰が次のCビットか当ててみよう',
            markText: '会員ランクは、会員の注文を更新するたびに、コインを使って好きな会員の注文を増やすことができます',
            future: '未来'
        }
    };

    return (
        <div>
            <div className="news-container">
                {/* 大新闻内容 */}
                <div className='carousel-news'>
                    <Carousel autoplay dotPosition="bottom">
                        {carouselImages.map((image, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <img
                                    src={image}
                                    alt={`carousel-${index}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="small-news-container">
                    <div className="small-news-1">
                        {/* 小新闻1内容 */}
                    </div>
                    <div className="small-news-2">
                        {/* 小新闻2内容 */}
                    </div>
                    <div className="small-news-3">
                        {/* 小新闻3内容 */}
                    </div>
                    <div className="small-news-4">
                        {/* 小新闻4内容 */}
                    </div>
                </div>
            </div>

            <div className="history-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].history}</p>
                <ReadOutlined style={{ marginLeft: "10px", marginBottom: "-50px", color: "rgb(145, 245, 245)", fontSize: "40px" }} />
            </div>

            <div className="history-line"></div>

            <div className="history-content">
                <img src={wallPaper1} className='small-image'></img>
                <div className="text-content">
                    <p>{translations[language].historyText}</p>
                </div>
                <button className="home-button history-button" onClick={goToHistory} style={{ marginRight: "10%" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="rank-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].rank}</p>
                <LineChartOutlined style={{ marginLeft: "10px", marginBottom: "-50px", color: "rgb(145, 245, 245)", fontSize: "40px" }} />
            </div>

            <div className="rank-line"></div>

            <div className="rank-content">
                <img src={wallPaper2} className='small-image'></img>
                <div className="text-content">
                    <p>{translations[language].rankText}</p>
                </div>
                <button className="home-button rank-button" onClick={goToRank} style={{ marginRight: "10%" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="gamble-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].gamble}</p>
                <GiftOutlined style={{ marginLeft: "10px", marginBottom: "-50px", color: "rgb(145, 245, 245)", fontSize: "40px" }} />
            </div>

            <div className="gamble-line"></div>

            <div className="gamble-content">
                <img src={wallPaper3} className='small-image'></img>
                <div className="text-content">
                    <p>{translations[language].gambleText}</p>
                </div>
                <button className="home-button gamble-button" onClick={goToGamble} style={{ marginRight: "10%" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="mark-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].mark}</p>
                <FundProjectionScreenOutlined style={{ marginLeft: "10px", marginBottom: "-50px", color: "rgb(145, 245, 245)", fontSize: "40px" }} />
            </div>

            <div className="mark-line"></div>

            <div className="mark-content">
                <img src={wallPaper4} className='small-image'></img>
                <div className="text-content">
                    <p>{translations[language].markText}</p>
                </div>
                <button className="home-button mark-button" onClick={goToMark} style={{ marginRight: "10%" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className='future-container'>
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].future}</p>
                <CrownOutlined style={{ marginLeft: "10px", marginBottom: "-50px", color: "rgb(145, 245, 245)", fontSize: "40px" }} />
            </div>

            <div className='future-line'></div>

            <div class="circle-container">
                <div class="circle">
                    <span>Expect</span>
                </div>
                <div class="circle">
                    <span>Expect</span>
                </div>
                <div class="circle">
                    <span>Expect</span>
                </div>
                <div class="circle">
                    <span>AI IDOL</span>
                </div>
            </div>

            {showBackToTop && (
                <div className="back-to-top" style={{ display: 'flex' }} onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}>
                    <UpOutlined /> {translations[language].backToTop}
                </div>
            )}
        </div>
    )
}

export default Home;
