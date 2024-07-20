import '../style/page/rank.css';
import { Button, Rate } from "antd";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';

echarts.use([BarChart, CanvasRenderer, GridComponent]);

const Rank = function ({ index, handleClick }) {
    const getImageName = (memberName) => {
        try {
            return require(`../pictures/member/${memberName}.jpg`);
        } catch (error) {
            return require(`../pictures/member/0001.jpg`);
        }
    };

    const memberName = `000${index + 1}`.slice(-4);

    const handleMemberClick = () => {
        handleClick(index);
    };

    return (
        <div className="rankGrid-container" onClick={handleMemberClick}>
            <div>
                <p>Member {memberName}</p>
            </div>
            <div>
                <img className="member-img" src={getImageName(memberName)} alt="Member" />
            </div>
            <div className="caption">
                <p>This is Rank</p>
            </div>
        </div>
    );
};

const RankPage = function () {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const navigate = useNavigate()

    const mark = -75;

    const handleClick = (index) => {
        setSelectedIndex(index);
        setShowModal(true);
    };

    const getImageName = (memberName) => {
        try {
            return require(`../pictures/member/${memberName}.jpg`);
        } catch (error) {
            return require(`../pictures/member/0001.jpg`);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const backToHome = () => {
        navigate('/')
    }

    const rankContainers = [];
    for (let i = 0; i < 32; i++) {
        rankContainers.push(<Rank key={i} index={i} handleClick={handleClick} />);
    }

    const RankArea = ({ memberID }) => {
        const [rating, setRating] = useState(0);
        const [hoverRating, setHoverRating] = useState(null);
        const [comment, setComment] = useState('');

        const handleRatingChange = (value) => {
            setRating(value);
        };

        const handleHoverChange = (value) => {
            setHoverRating(value);
        };

        const getRatingLabel = (value) => {
            if (value === null || isNaN(value)) return '请评分';
            if (value >= 3) {
                const score = (value - 3) * 2 + 1;
                return `${score} 分`;
            } else {
                const score = (value - 3) * 2;
                return `${score} 分`;
            }
        };

        const handleCommentChange = (e) => {
            setComment(e.target.value);
        };

        const handleSubmit = () => {
            // 在这里可以添加提交评分和评论的逻辑
            console.log(`Rating: ${rating}, Comment: ${comment}`);
        };

        const chartRef = useRef(null);

        const comments = [
            { rating: 4, author: 'John Doe', text: 'This is a great product!' },
            { rating: 3, author: 'Jane Smith', text: 'Could be better, but not bad.' },
            { rating: 5, author: 'Bob Johnson', text: 'Absolutely amazing! Highly recommended.' },
            { rating: 5, author: 'Bob Johnson', text: 'Absolutely amazing! Highly recommended.' },
            { rating: 5, author: 'Bob Johnson', text: 'Absolutely amazing! Highly recommended.' },
            { rating: 5, author: 'Bob Johnson', text: 'Absolutely amazing! Highly recommended.' },
            { rating: 5, author: 'Bob Johnson', text: 'Absolutely amazing! Highly recommended.' },
        ];


        useEffect(() => {
            const myChart = echarts.init(chartRef.current);
            const option = {
                xAxis: {
                    type: 'category',
                    data: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
                    splitLine: { show: false }, // 隐藏网格线
                    axisLine: { show: true }, // 显示 x 轴线
                    axisTick: { show: true }  // 显示 x 轴刻度线
                },
                yAxis: {
                    type: 'value',
                    splitLine: { show: false }, // 隐藏网格线
                    axisLine: { show: true }, // 显示 y 轴线
                    axisTick: { show: true }  // 显示 y 轴刻度线
                },
                series: [
                    {
                        data: [
                            { value: 120, itemStyle: { color: 'red' } },
                            { value: 200, itemStyle: { color: 'red' } },
                            { value: 150, itemStyle: { color: 'red' } },
                            { value: 80, itemStyle: { color: 'red' } },
                            { value: 70, itemStyle: { color: 'red' } },
                            { value: 110, itemStyle: { color: 'blue' } },
                            { value: 130, itemStyle: { color: 'blue' } },
                            { value: 90, itemStyle: { color: 'blue' } },
                            { value: 100, itemStyle: { color: 'blue' } },
                            { value: 170, itemStyle: { color: 'blue' } }
                        ],
                        type: 'bar',
                        barWidth: '40%' // 调整条形的宽度为 40%
                    }
                ]
            };
            myChart.setOption(option);
        }, []);

        return (
            <div>
                <p>member ID: {memberID}</p>
                <div className='markArea'>
                    <div className='memberRank-container'>
                        <img className="memberRank-img" src={getImageName(memberID)} alt="Member" />
                    </div>
                    <div className="chart-container">
                        <div ref={chartRef} style={{ height: '80%', width: '100%' }}></div>
                    </div>
                    <div className='totalMark-container'>
                        <p>Total mark: </p>
                        <div style={{
                            fontFamily: 'Arial Black, sans-serif', // 使用新字体
                            color: mark >= 0 ? 'blue' : 'red', // 根据分数显示不同颜色
                            fontSize: '7rem', // 增加字体大小
                        }}>
                            {mark}
                        </div>
                    </div>

                </div>

                <div className='commentArea'>
                    <div className="ratingArea">
                        <p>{getRatingLabel(hoverRating)}</p>
                        <div>
                            <Rate
                                allowHalf
                                value={rating - 2.5}
                                onChange={handleRatingChange}
                                onHoverChange={handleHoverChange}
                                style={{ fontSize: "200%" }} // 增加星星的大小
                            />
                            <Button style={{ width: "25%" }} type="primary">Submit Mark</Button>
                        </div>
                    </div>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Leave your comment..."
                    />
                    <Button type="primary" onClick={handleSubmit}>Submit Comment</Button>
                </div>

                <div className="comment-section">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        <div className="comment-list">
                            {comments.map((comment, index) => (
                                <div key={index} className="comment-item">
                                    <div className="comment-header">
                                        <div className="comment-rating">
                                            <Rate disabled value={comment.rating} style={{ fontSize: '1rem' }} />
                                        </div>
                                        <div className="comment-author">{comment.author}</div>
                                    </div>
                                    <div className="comment-body">{comment.text}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-comments">No comments yet.</div>
                    )}
                </div>

            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            </div>
            <div className={`page-container ${showModal ? 'blur' : ''}`}>
                {rankContainers}
                {showModal && (
                    <>
                        <div className="modal">
                            <div className='header-section'>
                                <h2>This is xxx's display area</h2>
                                <button className='closeButton' onClick={handleCloseModal}><CloseOutlined /></button>
                            </div>
                            {/* 添加一些内容以测试滚动效果 */}
                            {/*{Array.from({ length: 100 }, (_, i) => (
                                <p key={i}>This is a long content line {i + 1}</p>
                            ))}*/}
                            <RankArea memberID={`000${selectedIndex + 1}`.slice(-4)}></RankArea>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseModal}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RankPage;