import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import HistoryMain from '../pages/history';
import Rank from '../pages/rank';
import Gamble from '../pages/gamble';
import Mark from '../pages/mark';
import ImageCarousel from '../pages/test';

import MainBigPhoto3 from "../pictures/MainBigPhoto3.png"
import MainBigPhoto from "../pictures/MainBigPhoto.png"
import MainBigPhoto2 from "../pictures/MainBigPhoto2.jpg"
import MainSmallPhoto2 from "../pictures/MainSmallPhoto1.jpg"

const Main = function () {

    const carouselImages = [
        MainBigPhoto3,
        MainBigPhoto,
        MainBigPhoto2,
        MainSmallPhoto2
    ];

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history/*" element={<HistoryMain />} />
                <Route path='/rank' element={<Rank />} />
                <Route path='/gamble' element={<Gamble />} />
                <Route path='/mark' element={<Mark />} />
                <Route path='/test' element={<ImageCarousel />}></Route>
            </Routes>
        </div>
    )
}

export default Main;