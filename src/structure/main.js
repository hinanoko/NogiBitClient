import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import History from '../pages/history';
import Rank from '../pages/rank';
import Gamble from '../pages/gamble';
import Mark from '../pages/mark';

const Main = function () {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/history" element={<History></History>}></Route>
                    <Route path='/rank' element={<Rank></Rank>}></Route>
                    <Route path='/gamble' element={<Gamble></Gamble>}></Route>
                    <Route path='/mark' element={<Mark></Mark>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Main