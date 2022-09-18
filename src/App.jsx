import { useContext, useEffect } from 'react';
import {
  Route, BrowserRouter, Routes, Navigate,
} from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.scss';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [, setTheme] = useTheme();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let theme = localStorage.getItem('theme-preference');
    const body = document.getElementsByTagName('body')[0];

    if (theme) body.setAttribute('data-theme', theme);
    else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      body.setAttribute('data-theme', theme);
    }

    setTheme(theme);
  }, []);

  function ProtectedRoutes({ children }) {
    if (!currentUser) {
      return <Navigate to="/login/" />;
    }

    return children;
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={(
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              )}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
