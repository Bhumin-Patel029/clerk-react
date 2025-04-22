import { useEffect, useState } from 'react';
import { supabase } from '../supabase.js';
import { useUser } from '@clerk/clerk-react';

export default function RideGiverDashboard() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load
    if (!isSignedIn) {
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
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching request:', error);
      }

      if (data) {
        setRequest(data);
        console.log("Data fetched for Ride Giver:", data);
      } else {
        console.log("No ride requests found for this giver.");
      }
      setLoading(false);
    };

    fetchRequestForGiver();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div>Loading user...</div>;
  if (!isSignedIn) return <div>Please sign in to view your bookings.</div>;
  if (loading) return <div>Loading your booking...</div>;
  if (!request) return <div>No booking found for you.</div>;

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold text-orange-600">Ride Booked!</h2>
        <p className="text-lg">🧍 Taker: <strong>{request.taker_name}</strong></p>
        <p className="text-lg">🏠 House: <strong>{request.house}</strong></p>
        <p className="text-lg">🚗 Rides Needed: <strong>{request.rides_needed}</strong></p>
        <p className="text-lg">📅 Date: <strong>{request.date}</strong></p>
        <p className="text-lg">⏰ Ready By: <strong>{request.ready_by}</strong></p>
        <p className="text-lg">📞 Your Contact: <strong>{request.giver_contact}</strong></p>
      </div>
    </div>
  );
}
