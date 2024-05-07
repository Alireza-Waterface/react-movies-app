import { Suspense, lazy } from 'react';

import './App.css';

import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/topbar/TopBar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';
import Dashboard from './pages/dashboard/Dashboard';

const Artists = lazy(() => import('./pages/artists/Artists'));
const Artist = lazy(() => import('./pages/artist/Artist'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Home = lazy(() => import('./pages/home/Home'));
const Movies = lazy(() => import('./pages/movies/Movies'));
const Register = lazy(() => import('./pages/register/Register'));
const Series = lazy(() => import('./pages/series/Series'));
const Details = lazy(() => import('./pages/details/Details'));
const E404 = lazy(() => import('./pages/e404/E404'));
const Approved = lazy(() => import('./pages/approvedAcount/Approved'));

import { UserProvider } from './userProvider';

const Layout = () => (
    <UserProvider>
        <TopBar />
        <Navbar />
        <Outlet />
        <Footer />
    </UserProvider>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/artists/:page',
                element: <Artists />,
            },
            {
                path: '/artist/:id',
                element: <Artist />,
            },
            {
                path: '/series',
                element: <Series />,
            },
            {
                path: '/movies/:category/:page',
                element: <Movies />,
            },
            {
                path: '/details/:category/:id',
                element: <Details />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/approved',
                element: <Approved />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/*',
                element: <E404 />,
            },
        ],
    }
])

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
            <ToastContainer />
        </Suspense>
    );
};

export default App;