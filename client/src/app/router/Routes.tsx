import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/Home/HomePage';
import BusDashboard from '../../features/Buses/dashboard/BusDashboard';
import BookingHistory from '../../features/Bookings/BookingHistory';
import CreateBooking from '../../features/Bookings/CreateBooking';
import BookingPage from '../../features/Buses/form/BookingPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '', element: <HomePage />
            },
            {
                path: 'buses', element: <BusDashboard />
            },
            {
                path: 'bookings', element: <BookingHistory />
            },
            {
                path: 'createBooking', element: <CreateBooking />
            },
            {
                path: 'bookingPage/:id', element: <BookingPage />
            }

        ]
    }
])