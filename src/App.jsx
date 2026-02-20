import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PlaceDetail from './pages/PlaceDetail';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Plans from './pages/Plans';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="place/:id" element={<PlaceDetail />} />
          <Route path="explore" element={<Explore />} />
          <Route path="plans" element={<Plans />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
