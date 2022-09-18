import { useContext, useEffect } from 'react';
import {
  Route, BrowserRouter, Routes, Navigate,
} from 'react-router-dom';
import useTheme from './utils/setTheme';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.scss';
import { AuthContext } from './context/AuthContext';
import setTheme from './utils/setTheme';

export default function App() {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setTheme(localStorage.getItem('theme-preference') || 'light');
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
