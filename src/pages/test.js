import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // 确保引入 Ant Design 样式

import MainBigPhoto3 from "../pictures/MainBigPhoto3.png";
import MainBigPhoto from "../pictures/MainBigPhoto.png";
import MainBigPhoto2 from "../pictures/MainBigPhoto2.jpg";
import MainSmallPhoto2 from "../pictures/MainSmallPhoto2.jpg";

const carouselImages = [
    MainBigPhoto3,
    MainBigPhoto,
    MainBigPhoto2,
    MainSmallPhoto2
];

const ImageCarousel = () => (
    <div style={{ width: '75vh', height: '70vh', margin: '0 auto' }}>
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

);

export default ImageCarousel;
