import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function RideGiverList() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await supabase
        .from('ride_requests')
        .select('*')
        .is('giver_name', null); // Only unbooked
      setRequests(data);
    };
    fetchRequests();
    // Optionally, poll every 10s for updates
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = (request) => {
    // Go to booking form with request id
    navigate('/ride-giver', { state: { requestId: request.id } });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Available Ride Requests</h2>
        {requests.length === 0 ? (
          <p>No ride requests at the moment.</p>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="border-b pb-2 mb-2">
              <p><strong>{r.taker_name}</strong> needs {r.rides_needed} ride(s) from {r.house} on {r.date}</p>
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 mt-2"
                onClick={() => handleBook(r)}
              >
                Book this ride
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
