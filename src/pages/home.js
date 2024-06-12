import React from 'react';
import "../style/page/home.css"
import { useNavigate } from 'react-router-dom';

const Home = function () {
    const navigate = useNavigate();

    const goToHistory = function () {
        navigate('/history'); // 跳转到 About 页面
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
            This is home
            <button onClick={goToHistory}>History</button>
        </div>
    )
}

export default Home