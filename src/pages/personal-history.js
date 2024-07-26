import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../style/page/personal-history.css';
import shiori6 from '../pictures/shiori6Circle.jpg';
import { ArrowLeftOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { Modal, Button, Input, Upload, Select, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const PersonalHistory = function () {
    const navigate = useNavigate();
    const { idolName } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blogPost, setBlogPost] = useState({
        title: '',
        contentBlocks: []
    });

    const user = useSelector((state) => state.userHandler);

    const backToHome = () => {
        navigate('/history');
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const contentBlocks = await Promise.all(blogPost.contentBlocks.map(async (block) => {
                if (block.type === 'image' && block.file) {
                    const base64 = await getBase64(block.file);
                    return { type: 'image', value: base64 };
                }
                return block;
            }));

            const postData = {
                idolName,
                title: blogPost.title,
                contentBlocks
            };

            console.log(postData)


            // 发送请求到后端
            await axios.post('/api/blog', postData, {
                headers: { 'Authorization': user.userToken }
            });

            message.success('Blog post submitted successfully');
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to submit blog post');
            console.error('Error submitting blog post:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleContentBlockChange = (index, type, value) => {
        const newContentBlocks = [...blogPost.contentBlocks];
        newContentBlocks[index] = { type, value };
        setBlogPost(prevState => ({
            ...prevState,
            contentBlocks: newContentBlocks
        }));
    };

    const handleImageUpload = (index, file) => {
        const newContentBlocks = [...blogPost.contentBlocks];
        newContentBlocks[index] = { type: 'image', file, value: URL.createObjectURL(file) };
        setBlogPost(prevState => ({
            ...prevState,
            contentBlocks: newContentBlocks
        }));
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const addContentBlock = () => {
        setBlogPost(prevState => ({
            ...prevState,
            contentBlocks: [...prevState.contentBlocks, { type: 'text', value: '' }]
        }));
    };

    const removeContentBlock = (index) => {
        const newContentBlocks = blogPost.contentBlocks.filter((_, i) => i !== index);
        setBlogPost(prevState => ({
            ...prevState,
            contentBlocks: newContentBlocks
        }));
    };

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
            <Button onClick={showModal} className='edit-button' icon={<EditOutlined />}>
                Add Blog
            </Button>
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

            <Modal
                title="Edit Blog Post"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Input
                    name="title"
                    placeholder="Title"
                    value={blogPost.title}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                {blogPost.contentBlocks.map((block, index) => (
                    <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <Select
                            value={block.type}
                            onChange={(value) => handleContentBlockChange(index, value, block.value)}
                            style={{ width: '20%', marginRight: '10px' }}
                        >
                            <Option value="text">Text</Option>
                            <Option value="image">Image</Option>
                        </Select>
                        {block.type === 'text' ? (
                            <TextArea
                                rows={2}
                                value={block.value}
                                onChange={(e) => handleContentBlockChange(index, 'text', e.target.value)}
                                style={{ width: '70%', marginRight: '10px' }}
                            />
                        ) : (
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    handleImageUpload(index, file);
                                    return false; // 阻止 Upload 组件自动上传
                                }}
                            >
                                {block.value ? <img src={block.value} alt="content" style={{ width: '100%' }} /> : <PlusOutlined />}
                            </Upload>
                        )}
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => removeContentBlock(index)}
                        />
                    </div>
                ))}
                <Button type="dashed" onClick={addContentBlock} style={{ width: '100%' }}>
                    <PlusOutlined /> Add Content Block
                </Button>
            </Modal>
        </div>
    );
};

export default PersonalHistory;
