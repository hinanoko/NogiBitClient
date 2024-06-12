import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/home';
import History from '../pages/history';
import Rank from '../pages/rank';

const Main = function () {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/history" element={<History></History>}></Route>
                    <Route path='/rank' element={<Rank></Rank>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Main