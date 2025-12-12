import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";
import Profile from './components/Profile';
import { ROUTES } from './routes';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
