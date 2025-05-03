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
  const { isLoaded, isSignedIn, user } = useUser();
  const requestId = location.state?.requestId;

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to book a ride.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestId) {
      alert('No ride request selected.');
      return;
    }

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
    <form onSubmit={handleSubmit}>
      <h2>Book a Ride</h2>
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="tel" placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} required />
      <input type="time" value={readyBy} onChange={e => setReadyBy(e.target.value)} required />
      <button type="submit">Book Ride</button>
    </form>
  );
}
