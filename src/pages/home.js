import React from 'react';
import "../style/page/home.css"
import boatIcon from '../icons/boat.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { LineChartOutlined, ReadOutlined, FundProjectionScreenOutlined, GiftOutlined } from '@ant-design/icons';

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
            markText: 'member rank, update member\'s order every single, you can use coin to increase the order of the member you like'
        },
        cn: {
            history: '光辉事迹',
            rank: '排名榜',
            gamble: '猜轮盘',
            mark: '季度打分',
            enter: '进入详情',
            backToTop: '回到顶部',
            historyText: '光辉历史记录：抱着赛博放大镜，记录下您心爱的小婊的每一个讨人厌的历史',
            rankText: '打分排名：毫无顾忌的疯狂打分，从0到10供君选择，别忘了留下您的优美评论',
            gambleText: '赛博赌场：猜猜谁是下一个C位',
            markText: '小婊排名：每单曲同步更新小婊排名，可以通过使用莱姆币让您心爱的小婊一飞冲天'
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
            markText: '会員ランクは、会員の注文を更新するたびに、コインを使って好きな会員の注文を増やすことができます'
        }
    };

    return (
        <div>
            <div className="news-container">
                <div className="big-news" onClick={() => handleNewsClick()}>
                    {/* 大新闻内容 */}
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
                <ReadOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="history-line"></div>

            <div className="history-content">
                {/* History内容 */}
                <p>{translations[language].historyText}</p>
                <button className="home-button history-button" onClick={goToHistory} style={{ marginLeft: "240px" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="rank-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].rank}</p>
                <LineChartOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="rank-line"></div>

            <div className="rank-content">
                {/* Rank内容 */}
                <p>{translations[language].rankText}</p>
                <button className="home-button rank-button" onClick={goToRank} style={{ marginLeft: "230px" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="gamble-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].gamble}</p>
                <GiftOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="gamble-line"></div>

            <div className="gamble-content">
                {/* Gamble内容 */}
                <p>{translations[language].gambleText}</p>
                <button className="home-button gamble-button" onClick={goToGamble} style={{ marginLeft: "560px" }}>
                    {translations[language].enter}
                </button>
            </div>

            <div className="mark-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>{translations[language].mark}</p>
                <FundProjectionScreenOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="mark-line"></div>

            <div className="mark-content">
                {/* Mark内容 */}
                <p>{translations[language].markText}</p>
                <button className="home-button mark-button" onClick={goToMark} style={{ marginLeft: "190px" }}>
                    {translations[language].enter}
                </button>
            </div>

            {showBackToTop && (
                <div className="back-to-top" style={{ marginLeft: "660px" }} onClick={() => {
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

export default Home