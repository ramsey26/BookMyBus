import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/Home/HomePage';
import BusDashboard from '../../features/Buses/dashboard/BusDashboard';
import BookingHistory from '../../features/Bookings/BookingHistory';
import BookingPage from '../../features/Bookings/BookingPage';
import LoginForm from '../../features/Account/LoginForm';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    {
                        path: 'bookings', element: <BookingHistory />
                    },
                    {
                        path: 'bookingPage/:id', element: <BookingPage />
                    }
                ]
            },
            {
                path: '', element: <HomePage />
            },
            {
                path: 'buses', element: <BusDashboard />
            },
            {
                path: 'login', element: <LoginForm />
            }
        ]
    }
])