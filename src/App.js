import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Invoices from './scenes/invoices';
import Contacts from './scenes/contacts';
import Form from './scenes/form';
import Bar from './scenes/bar';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Calendar from './scenes/calendar';
import { useAuth } from './auth';
import SignInSide from './scenes/login';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && user && <Sidebar />}
          <main className="content">
            {!isLoginPage && user && <Topbar />}
            <Routes>
              <Route path="/login" element={<SignInSide />} />
              <Route
                element={user ? <Outlet /> : <Navigate to="/login" />}
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
