import './style/structure/main.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './structure/header';
import Footer from './structure/footer';
import Main from './structure/main';

function App() {
  return (
    <div className="layout">
      <div className="header"><Header></Header></div>
      <div className="main"><Main></Main></div>
      <div className="footer"><Footer></Footer></div>
    </div>
  );
}

export default App;
