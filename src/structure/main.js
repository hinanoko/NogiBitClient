import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import HistoryMain from '../pages/history';
import Rank from '../pages/rank';
import Gamble from '../pages/gamble';
import Mark from '../pages/mark';

const Main = function () {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history/*" element={<HistoryMain />} />
                    <Route path='/rank' element={<Rank />} />
                    <Route path='/gamble' element={<Gamble />} />
                    <Route path='/mark' element={<Mark />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Main;