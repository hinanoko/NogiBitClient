import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../style/page/personal-history.css';
import shiori6 from '../pictures/shiori6Circle.jpg';
import { ArrowLeftOutlined } from '@ant-design/icons';

const PersonalHistory = function () {
    const navigate = useNavigate();
    const { idolName } = useParams();

    const backToHome = () => {
        navigate('/history');
    }

    const Blog = function () {
        return (
            <div className="single-blog">
                <div className="single-title">
                    <p>この状態で親にビデオ通話かけたら スター誕生見たいから切るねーって言われちゃいました わざわざメイクしてヘアセットしたのに</p>
                </div>
                <img src={shiori6} className="single-image" alt="blog" />
                <div className="single-date">
                    2024-06-21
                </div>
            </div>
        );
    }

    const blogGrid = [];
    for (let i = 0; i < 32; i++) {
        blogGrid.push(<Blog key={i}></Blog>);
    }

    return (
        <div className="history-layout">
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            <h2>Personal History for {idolName}</h2>
            <div>
                <p>2024</p>
                <div className="year-line"></div>
            </div>
            <div className="grid-container">
                {blogGrid}
            </div>
            <div>
                <p>2023</p>
                <div className="year-line"></div>
            </div>
            <div className="grid-container">
                {blogGrid}
            </div>
        </div>
    );
};

export default PersonalHistory;