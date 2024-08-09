import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Upload, Select, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import '../style/page/personal-history.css';

const { TextArea } = Input;
const { Option } = Select;

const PersonalHistory = function () {
    const navigate = useNavigate();
    const { idolName } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [blogPost, setBlogPost] = useState({
        title: '',
        contentBlocks: []
    });
    const [selectedBlog, setSelectedBlog] = useState(null);

    const user = useSelector((state) => state.userHandler);

    useEffect(() => {
        fetchBlogs();
    }, [idolName]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/history/summary`, {
                params: { idolId: idolName }
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            message.error('Failed to fetch blogs');
        }
    };

    const backToHome = () => {
        navigate('/history');
    }

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const handleCreateOk = async () => {
        if (blogPost.title.length < 1 || blogPost.title.length > 15) {
            message.error('Title must be between 1 and 15 characters');
            return;
        }

        try {
            const contentBlocks = await Promise.all(blogPost.contentBlocks.map(async (block) => {
                if (block.type === 'image' && block.file) {
                    const base64 = await getBase64(block.file);
                    return { type: 'image', value: base64 };
                }
                return block;
            }));

            const postData = {
                blogIdolId: idolName,
                blogUserId: user.userName,
                title: blogPost.title,
                contentBlocks
            };

            console.log(postData)

            await axios.post('http://localhost:8081/history', postData, {
                headers: { 'Authorization': user.userToken }
            });

            message.success('Blog post submitted successfully');
            setIsCreateModalVisible(false);
            setBlogPost({
                title: '',
                contentBlocks: []
            });
            fetchBlogs(); // Refresh the blog list
        } catch (error) {
            message.error('Failed to submit blog post');
            console.error('Error submitting blog post:', error);
        }
    };

    const handleCreateCancel = () => {
        setIsCreateModalVisible(false);
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

    const showBlogDetail = async (blog) => {
        try {
            const response = await axios.get(`http://localhost:8081/history/blog`, {
                params: { idolId: idolName, blogId: blog.blogId }
            });

            const blogData = response.data;

            const processedImageUrls = blogData.imageUrls.map((imageUrl) => {
                const base64Image = imageUrl.split(',')[1]; // 去掉 "data:image/png;base64," 前缀
                return base64Image;
            });

            // 更新 selectedBlog 数据
            setSelectedBlog({
                ...blogData,
                imageUrls: processedImageUrls
            });
            setIsViewModalVisible(true);
        } catch (error) {
            console.error('Error fetching blog detail:', error);
            message.error('Failed to fetch blog detail');
        }
    };

    const handleViewModalClose = () => {
        setIsViewModalVisible(false);
        setSelectedBlog(null);
    };

    const Blog = function ({ blog }) {
        const base64Image = blog.firstImage.split(',')[1]; // 去掉"data:image/png;base64,"前缀
        const imageSrc = `data:image/png;base64,${base64Image}`;
        return (
            <div className="single-blog" onClick={() => showBlogDetail(blog)}>
                <div className="single-title">
                    <p className="title-text">{blog.title}</p>
                </div>
                <img src={imageSrc} className="single-image" alt="blog" />
                <div className="single-date">
                    {blog.blogDate}
                </div>
            </div>
        );
    }

    const groupBlogsByYear = () => {
        const groupedBlogs = {};
        blogs.forEach(blog => {
            const year = new Date(blog.blogDate).getFullYear();
            if (!groupedBlogs[year]) {
                groupedBlogs[year] = [];
            }
            groupedBlogs[year].push(blog);
        });
        return groupedBlogs;
    }

    const groupedBlogs = groupBlogsByYear();

    let imageIndex = 0; // 在组件外部定义一个变量来存储当前的图片索引


    return (
        <div className="history-layout">
            <button onClick={backToHome} className='back-button'><ArrowLeftOutlined /></button>
            <Button onClick={showCreateModal} className='edit-button' icon={<EditOutlined />}>
                Add Blog
            </Button>
            <h2>Personal History for {idolName}</h2>
            {Object.entries(groupedBlogs).sort((a, b) => b[0] - a[0]).map(([year, yearBlogs]) => (
                <div key={year}>
                    <p>{year}</p>
                    <div className="year-line"></div>
                    <div className="grid-container">
                        {yearBlogs.map((blog, index) => (
                            <Blog key={index} blog={blog} />
                        ))}
                    </div>
                </div>
            ))}

            {/* Create Blog Modal */}
            <Modal
                title="Create New Blog Post"
                visible={isCreateModalVisible}
                onOk={handleCreateOk}
                onCancel={handleCreateCancel}
                width={800}
            >
                <Input
                    name="title"
                    placeholder="Title (1-15 characters)"
                    value={blogPost.title}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                    maxLength={15}
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

            {/* View Blog Modal */}
            <Modal
                title={selectedBlog?.title || "Blog Detail"}
                visible={isViewModalVisible}
                onCancel={handleViewModalClose}
                footer={[
                    <Button key="close" onClick={handleViewModalClose}>
                        Close
                    </Button>
                ]}
                width={800}
            >
                {selectedBlog && (
                    <div>
                        <ReactMarkdown
                            children={selectedBlog.content}
                            components={{
                                img: ({ node, ...props }) => {
                                    // 获取当前图片的base64数据
                                    const base64Image = selectedBlog.imageUrls[imageIndex];

                                    // 递增索引，以便下一次使用
                                    imageIndex = (imageIndex + 1) % selectedBlog.imageUrls.length;

                                    const imgSrc = `data:image/png;base64,${base64Image}`;
                                    return <img {...props} src={imgSrc} style={{ maxWidth: '100%' }} />;
                                }
                            }}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PersonalHistory;
