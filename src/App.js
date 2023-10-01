import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import PublicRoutes from './authentication/PublicRoutes';
import ProtectedRoutes from './authentication/ProtectedRoutes';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import DashboardAppPage from './pages/DashboardAppPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </HashRouter>
    </HelmetProvider>
  );
}
