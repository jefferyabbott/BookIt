'use server';

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { DateTime } from 'luxon';

function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, {zone:'UTC'}).toUTC();
}

// check for overlapping times
function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    // get all bookings for a given room
    const { documents:bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)]
    );
    
    // iterate over bookings and check for overlaps
    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);
      if (dateRangesOverlap(checkInDateTime, checkOutDateTime, bookingCheckInDateTime, bookingCheckOutDateTime)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability.'
    }
  }
}

export default checkRoomAvailability;
