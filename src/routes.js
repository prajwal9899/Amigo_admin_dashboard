import { Navigate, Routes, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PublicRoutes from './authentication/PublicRoutes';
import ProtectedRoutes from './authentication/ProtectedRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoutes><DashboardLayout /></ProtectedRoutes>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element:<ProtectedRoutes><DashboardAppPage /></ProtectedRoutes>  },
        { path: 'user', element: <ProtectedRoutes><UserPage /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><ProductsPage /></ProtectedRoutes> },
        { path: 'blog', element: <ProtectedRoutes><BlogPage /></ProtectedRoutes> },
      ],
    },
    {
      path: 'login',
      element: <PublicRoutes><LoginPage /></PublicRoutes>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
