'use client';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import cancelBooking from '@/app/actions/cancelBooking';

const CancelBookingButton = ({ bookingId }) => {

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to cancel this booking?');
        if (confirmed) {
            try {
                const response = await cancelBooking(bookingId);
                toast.success('Booking cancelled.');
            } catch (error) {
                console.log('Failed to cancel booking');
                toast.error('Failed to cancel booking.');
            }
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
          >
            <FaTrash className="inline mr-1"/> Cancel Booking
          </button>
    );
}

export default CancelBookingButton;

