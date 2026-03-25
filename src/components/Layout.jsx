import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />

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
                toastClassName={() => "relative flex p-4 min-h-16 rounded-2xl justify-between overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-2xl"}
                bodyClassName={() => "text-sm font-bold text-slate-900 flex p-3"}
            />
        </div>
    );
};

export default Layout;
