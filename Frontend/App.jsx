import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './HomePage';
import Login from './UserManagement/Login';
import Register from './UserManagement/Register';
import AdminDashboard from './Admin/AdminDashboard';
import LaundryList from './LaundryManagement/LaundryList';
import LaundryDetails from './LaundryManagement/LaundryDetails';
import AddLaundry from './LaundryManagement/AddLaundry';
import ManageBookings from './LaundryManagement/ManageBookings';
import MyBookings from './LaundryManagement/MyBookings';
import Profile from './UserManagement/Profile';

import './App.css';
import './light-mode.css'; // Global light mode overrides

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userRole = userInfo.role?.toUpperCase();

    if (!userInfo || !userInfo.token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />

                {/* Laundry Routes */}
                <Route path="/laundry" element={<LaundryList />} />
                <Route path="/laundry/:id" element={<LaundryDetails />} />
                <Route path="/add-laundry" element={
                    <ProtectedRoute allowedRoles={['PROVIDER', 'ADMIN']}>
                        <AddLaundry />
                    </ProtectedRoute>
                } />
                <Route path="/edit-laundry/:id" element={
                    <ProtectedRoute allowedRoles={['PROVIDER', 'ADMIN']}>
                        <AddLaundry />
                    </ProtectedRoute>
                } />
                <Route path="/manage-bookings" element={
                    <ProtectedRoute allowedRoles={['PROVIDER', 'ADMIN']}>
                        <ManageBookings />
                    </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                    <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                        <MyBookings />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />

                {/* Catch-all Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
