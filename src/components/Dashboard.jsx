import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useUser } from '@clerk/clerk-react';

export default function RideTakerDashboard() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchRequestForTaker = async () => {
      const { data, error } = await supabase
        .from('ride_requests')
        .select(`
          *,
          giver_name,
          giver_contact,
          ready_by,
          booked_at
        `)
        .eq('taker_id', user.id)
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching request:', error);
      }

      if (data) setRequest(data);
      setLoading(false);
    };

    fetchRequestForTaker();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div>Loading user...</div>;
  if (!isSignedIn) return <div>Please sign in to view your requests.</div>;
  if (loading) return <div>Loading your request...</div>;
  if (!request) return <div>No ride request found.</div>;

  return (
    <div>
      <h2>Your Ride Request</h2>
      <p>House: {request.house}</p>
      <p>Date: {request.date}</p>
      <p>Rides Needed: {request.rides_needed}</p>
      <p>Status: {request.giver_id ? 'Booked' : 'Pending'}</p>
      {request.giver_id && (
        <>
          <h3>Your Ride Giver</h3>
          <p>Name: {request.giver_name}</p>
          <p>Contact: {request.giver_contact}</p>
          <p>Ready By: {request.ready_by}</p>
        </>
      )}
    </div>
  );
}
