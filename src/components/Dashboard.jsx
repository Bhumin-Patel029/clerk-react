import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function RideTakerDashboard() {
  const location = useLocation();
  const { id } = location.state || {};
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchRequest = async () => {
      const { data } = await supabase
        .from('ride_requests')
        .select('*')
        .eq('id', id)
        .single();
      setRequest(data);
    };
    fetchRequest();

    // Subscribe to updates (realtime)
    const channel = supabase
      .channel('public:ride_requests')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'ride_requests', filter: `id=eq.${id}` },
        (payload) => {
          setRequest(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  console.log("Request ID from URL:", id);

  if (!request) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold text-green-700">
          Welcome, {request.taker_name}!
        </h2>
        <p className="text-lg">📍 House: <strong>{request.house}</strong></p>
        <p className="text-lg">🚗 Rides Needed: <strong>{request.rides_needed}</strong></p>
        {!request.giver_name ? (
          <p className="text-sm text-gray-500 mt-4 italic">Waiting for a ride giver to match you…</p>
        ) : (
          <div className="mt-4">
            <p className="text-lg text-green-700 font-semibold">🎉 Ride Giver Found!</p>
            <p>Giver: <strong>{request.giver_name}</strong></p>
            <p>Contact: <strong>{request.giver_contact}</strong></p>
            <p>Ready By: <strong>{request.ready_by}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}
