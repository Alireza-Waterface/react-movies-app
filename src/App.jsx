import './App.css';

import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import TopBar from './components/topbar/TopBar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

import Artists from './pages/artists/Artists';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import Movies from './pages/movies/Movies';
import Movie from './pages/movie/Movie';
import Register from './pages/register/Register';
import Series from './pages/series/Series';
import Serie from './pages/serie/Serie';
import E404 from './pages/e404/E404';

const Layout = () => (
    <>
        <TopBar />
        <Navbar />
        <Outlet />
        <Footer />
    </>
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
                path: '/artists',
                element: <Artists />,
            },
            {
                path: '/series',
                element: <Series />,
            },
            {
                path: '/movies',
                element: <Movies />,
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
                path: '/movie/:id',
                element: <Movie />,
            },
            {
                path: '/serie/:id',
                element: <Serie />,
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
        <RouterProvider router={router} />
    );
};

export default App;