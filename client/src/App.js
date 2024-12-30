import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';
import Games from './pages/Games';
import Chatbot from './pages/Chatbot';
import Health from './pages/Health';
import MoodAnalysis from './pages/MoodAnalysis';

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route element={<Layout />}>
                <Route path="/" element={user ? <Community /> : <Navigate to="/login" />} />
                <Route path="/community" element={user ? <Community /> : <Navigate to="/login" />} />
                <Route path="/games" element={user ? <Games /> : <Navigate to="/login" />} />
                <Route path="/chat" element={user ? <Chatbot /> : <Navigate to="/login" />} />
                <Route path="/health" element={user ? <Health /> : <Navigate to="/login" />} />
                <Route path="/mood" element={user ? <MoodAnalysis /> : <Navigate to="/login" />} />
            </Route>
        </Routes>
    );
}

export default App; 