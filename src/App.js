import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import User from './scenes/user';
import Comment from './scenes/comment';
import Video from './scenes/video';
import Form from './scenes/form';
import Bar from './scenes/bar';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Calendar from './scenes/calendar';
import { useAuth } from './auth';
import SignInSide from './scenes/login';
import SignUp from './scenes/signup';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useAuth();
  const location = useLocation();
  const isLoginOrSignupPage =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginOrSignupPage && user && <Sidebar />}
          <main className="content">
            {!isLoginOrSignupPage && user && <Topbar />}
            <Routes>
              <Route path="/login" element={<SignInSide />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                element={user ? <Outlet /> : <Navigate to="/login" />}
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/user" element={<User />} />
                <Route path="/video" element={<Video />} />
                <Route path="/comment" element={<Comment />} />
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
