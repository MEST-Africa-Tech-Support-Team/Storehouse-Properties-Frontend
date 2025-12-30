import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Explore from './pages/explore.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </Router>
  );
} 

