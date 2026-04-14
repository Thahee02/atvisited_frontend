import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PlaceDetail from './pages/PlaceDetail';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import PlanBuilder from './pages/PlanBuilder';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePlaces from './pages/admin/ManagePlaces';
import ManageCategories from './pages/admin/ManageCategories';
import AdminSettings from './pages/admin/AdminSettings';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/useAuthStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="place/:id" element={<PlaceDetail />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="plans" element={<Plans />} />
            <Route path="plans/:id" element={<PlanDetail />} />
            <Route path="build-plan" element={<PlanBuilder />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Legacy redirect */}
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/places" element={<ManagePlaces />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global toast — covers admin pages that don't use Layout */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName={() =>
          'relative flex p-4 min-h-16 rounded-2xl justify-between overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-2xl'
        }
        bodyClassName={() =>
          'text-sm font-bold flex p-3'
        }
        style={{ '--toastify-text-color-light': '#000000', color: '#000000' }}
      />
    </BrowserRouter>
  );
};


export default App;
