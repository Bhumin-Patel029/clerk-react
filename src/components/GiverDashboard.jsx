import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useUser } from '@clerk/clerk-react';

export default function RideGiverDashboard() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchRequestForGiver = async () => {
      const { data, error } = await supabase
        .from('ride_requests')
        .select(`
          *,
          taker_name,
          house,
          rides_needed,
          date,
          ready_by,
          giver_contact
        `)
        .eq('giver_id', user.id)
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching request:', error);
      }

      if (data) setRequest(data);
      setLoading(false);
    };

    fetchRequestForGiver();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div>Loading user...</div>;
  if (!isSignedIn) return <div>Please sign in to view your bookings.</div>;
  if (loading) return <div>Loading your booking...</div>;
  if (!request) return <div>No booking found for you.</div>;

  return (
    <div>
      <h2>Your Booked Ride</h2>
      <p>Taker Name: {request.taker_name}</p>
      <p>House: {request.house}</p>
      <p>Date: {request.date}</p>
      <p>Rides Needed: {request.rides_needed}</p>
      <p>Ready By: {request.ready_by}</p>
      <p>Your Contact: {request.giver_contact}</p>
    </div>
  );
}
