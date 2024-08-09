import '../style/page/rank.css';
import { Button, Rate } from "antd";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import axios from 'axios';

echarts.use([BarChart, CanvasRenderer, GridComponent]);

const memberData = [
    { id: "0001", name: "Ioki_Mao" },
    { id: "0002", name: "Ichinose_Miku" },
    { id: "0003", name: "Okamoto_Hina" },
    { id: "0004", name: "Ogawa_Aya" },
    { id: "0005", name: "Okuda_Iroha" },
    { id: "0006", name: "Kawasaki_Sakura" },
    { id: "0007", name: "Sugawara_Satsuki" },
    { id: "0008", name: "Tomisato_Nao" },
    { id: "0009", name: "Nakanishi_Aruno" },
    { id: "0010", name: "Inoue_Nagi" },
    { id: "0011", name: "Ikeda_Teresa" },
    { id: "0012", name: "Umezawa_Minami" },
    { id: "0013", name: "Kubo_Shiori" },
    { id: "0014", name: "Sato_Kaede" },
    { id: "0015", name: "Nakamura_Reno" },
    { id: "0016", name: "Mukai_Hazuki" },
    { id: "0017", name: "Yoda_Yuki" },
    { id: "0018", name: "Yoshida_Ayano_Christie" },
    { id: "0019", name: "Ito_Ririan" },
    { id: "0020", name: "Iwamoto_Renka" },
    { id: "0021", name: "Endo_Sakura" },
    { id: "0022", name: "Kaki_Haruka" },
    { id: "0023", name: "Kanagawa_Saya" },
    { id: "0024", name: "Shibata_Yuna" },
    { id: "0025", name: "Tamura_Mayu" },
    { id: "0026", name: "Tsutsui_Ayame" },
    { id: "0027", name: "Hayashi_Runa" },
    { id: "0028", name: "Matsuo_Miyu" },
    { id: "0029", name: "Yakubo_Mio" },
    { id: "0030", name: "Yumiki_Nao" },
    { id: "0031", name: "Kuromi_Haruka" },
    { id: "0032", name: "Sato_Rika" },
];

const getNameById = (id) => {
    const member = memberData.find(member => member.id === id);
    return member ? member.name : "Unknown Member";
};

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

    const nogiName = getNameById(memberName);

    return (
        <div className="rankGrid-container" onClick={handleMemberClick}>
            <div>
                <p>{nogiName}</p>
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

    const user = useSelector((state) => state.userHandler);

    const navigate = useNavigate();

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
        navigate('/');
    };

    const rankContainers = [];
    for (let i = 0; i < 32; i++) {
        rankContainers.push(<Rank key={i} index={i} handleClick={handleClick} />);
    }

    const RankArea = ({ memberID }) => {
        const [rating, setRating] = useState(0);
        const [hoverRating, setHoverRating] = useState(null);
        const [comment, setComment] = useState('');
        const [comments, setComments] = useState([]);
        const [totalMark, setTotalMark] = useState(0);

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

        const memberName = getNameById(memberID);

        const handleSubmit = () => {
            const customerComment = {
                customerId: user.userId,
                memberId: memberID,
                content: comment,
                date: new Date().toISOString().split('T')[0]
            }
            axios.post('http://localhost:8081/comments/add', customerComment, {
                headers: {
                    'Authorization': user.userToken
                }
            }).then(response => {
                console.log(response)
            })
            console.log(comment);
            setComment('')
        };

        const submitMark = () => {
            console.log()

            const memberInformation = {
                customerId: user.userId,
                memberId: memberID,
                memberMark: mapStarsToScore(rating)
            }
            axios.post('http://localhost:8081/rank/rate', memberInformation, {
                headers: {
                    'Authorization': user.userToken
                }
            }).then(response => {
                console.log(response)
            })

        }

        const chartRef = useRef(null);

        useEffect(() => {
            const myChart = echarts.init(chartRef.current);
            const formattedMemberID = parseInt(memberID, 10);

            axios.get(`http://localhost:8081/rank/member?memberId=${formattedMemberID}`)
                .then(response => {
                    const scoresData = response.data.scores;
                    setTotalMark(response.data.totalRank);

                    // Map scoresData to the format required by the chart
                    const categories = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
                    const data = categories.map(category => {
                        const key = `score_${category < 0 ? 'n' : 'p'}${Math.abs(category)}_count`;
                        return {
                            value: scoresData[key] || 0,
                            itemStyle: { color: category < 0 ? 'red' : 'blue' }
                        };
                    });

                    const option = {
                        xAxis: {
                            type: 'category',
                            data: categories,
                            splitLine: { show: false },
                            axisLine: { show: true },
                            axisTick: { show: true }
                        },
                        yAxis: {
                            type: 'value',
                            splitLine: { show: false },
                            axisLine: { show: true },
                            axisTick: { show: true }
                        },
                        series: [
                            {
                                data: data,
                                type: 'bar',
                                barWidth: '40%'
                            }
                        ]
                    };

                    myChart.setOption(option);
                })
                .catch(error => {
                    console.error("Error fetching member data:", error);
                });
        }, [memberID]);

        useEffect(() => {
            if (memberID) {
                const formattedMemberID = parseInt(memberID, 10);
                axios.get(`http://localhost:8081/comments/member?memberId=${formattedMemberID}`)
                    .then(response => {
                        setComments(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching comments:', error);
                    });
            }
        }, [memberID]);

        const mapScoreToStars = (score) => {
            console.log("Score:", score);  // 调试信息
            if (score === 0) return parseFloat(0); // No stars for score 0
            if (score === -5) return parseFloat(0.5);
            if (score === -4) return parseFloat(1);
            if (score === -3) return parseFloat(1.5);
            if (score === -2) return parseFloat(2);
            if (score === -1) return parseFloat(2.5);
            if (score === 5) return parseFloat(5);
            if (score === 4) return parseFloat(4.5);
            if (score === 3) return parseFloat(4);
            if (score === 2) return parseFloat(3.5);
            if (score === 1) return parseFloat(3);
        };

        const mapStarsToScore = (star) => {
            if (star === 0) return 0; // No stars for score 0
            if (star === 0.5) return -5;
            if (star === 1) return -4;
            if (star === 1.5) return -3;
            if (star === 2) return -2;
            if (star === 1.5) return -1;
            if (star === 5) return 5;
            if (star === 4.5) return 4;
            if (star === 4) return 3;
            if (star === 3.5) return 2;
            if (star === 3) return 1;
        }

        return (
            <div>
                <p>Member Name: {memberName}</p>
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
                            fontFamily: 'Arial Black, sans-serif',
                            color: totalMark >= 0 ? 'blue' : 'red',
                            fontSize: '7rem',
                        }}>
                            {totalMark}
                        </div>
                    </div>
                </div>

                <div className='commentArea'>
                    <div className="ratingArea">
                        <p>{getRatingLabel(hoverRating)}</p>
                        <div>
                            <Rate
                                allowHalf
                                value={rating}
                                onChange={handleRatingChange}
                                onHoverChange={handleHoverChange}
                                style={{ fontSize: "200%" }}
                            />
                            <Button style={{ width: "25%" }} type="primary" onClick={submitMark}>Submit Mark</Button>
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
                                <div key={comment.commentId} className="comment-item">
                                    <div className="comment-header">
                                        <div className="comment-author">{comment.customerName}</div>
                                        <div className="comment-rating" style={{ marginLeft: "1%" }}>
                                            {comment.score !== 0 && (
                                                <Rate allowHalf disabled value={mapScoreToStars(comment.score)} style={{ fontSize: '1rem' }} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="comment-body">{comment.content}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-comments">No comments yet.</div>
                    )}
                </div>

            </div>
        );
    };

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
                                <h2>This is {getNameById(`000${selectedIndex + 1}`.slice(-4))}'s display area</h2>
                                <button className='closeButton' onClick={handleCloseModal}><CloseOutlined /></button>
                            </div>
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
