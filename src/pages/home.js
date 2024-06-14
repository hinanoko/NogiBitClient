import React from 'react';
import "../style/page/home.css"
import boatIcon from '../icons/boat.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { LineChartOutlined, ReadOutlined, FundProjectionScreenOutlined, GiftOutlined } from '@ant-design/icons';

const Home = function () {
    const navigate = useNavigate();

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
                <p className="custom-font" style={{ marginBottom: "2px" }}>History</p>
                <ReadOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="history-line"></div>

            <div className="history-content">
                {/* History内容 */}
                <button onClick={goToHistory}>History</button>
            </div>

            <div className="rank-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>Rank</p>
                <LineChartOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="rank-line"></div>

            <div className="rank-content">
                {/* Rank内容 */}
                <p>打分排名：毫无顾忌的疯狂打分，从0到10供君选择，别忘了留下您的优美评论</p>
                <button className="home-button rank-button" onClick={goToRank} style={{ marginLeft: "230px" }}>
                    Enter Now
                </button>
            </div>

            <div className="gamble-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>Gamble</p>
                <GiftOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="gamble-line"></div>

            <div className="gamble-content">
                {/* Gamble内容 */}
                <button onClick={goToGamble}>Gamble</button>
            </div>

            <div className="mark-container">
                <p className="custom-font" style={{ marginBottom: "2px" }}>Mark</p>
                <FundProjectionScreenOutlined style={{ marginLeft: "10px", marginBottom: "-25px", color: "rgb(145, 245, 245)", fontSize: "30px" }} />
            </div>

            <div className="mark-line"></div>

            <div className="mark-content">
                {/* Mark内容 */}
                <button onClick={goToMark}>Mark</button>
            </div>

            {showBackToTop && (
                <div className="back-to-top" style={{ marginLeft: "660px" }} onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}>
                    <UpOutlined /> Back to Top
                </div>
            )}
        </div>
    )
}

export default Home