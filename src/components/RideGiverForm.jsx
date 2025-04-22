import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';
import { useUser } from '@clerk/clerk-react';

export default function RideGiverForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [readyBy, setReadyBy] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser(); // <-- useUser, not useClerk
  const requestId = location.state?.requestId;

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to book a ride.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestId) {
      alert('No ride request selected.');
      return;
    }

    // user.id is the Clerk user ID
    const { data, error } = await supabase
      .from('ride_requests')
      .update({
        giver_name: name,
        giver_contact: contact,
        ready_by: readyBy,
        booked_at: new Date().toISOString(),
        giver_id: user.id,
      })
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      alert('Error booking ride: ' + error.message);
      return;
    }

    navigate('/giverdashboard', { state: { request: data } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: "url('./BG-2.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Ride Giver Booking</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="time"
          value={readyBy}
          onChange={(e) => setReadyBy(e.target.value)}
          className="w-full p-2 rounded border"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
}
