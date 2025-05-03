import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useUser } from '@clerk/clerk-react';

export default function RideTakerForm() {
  const [name, setName] = useState('');
  const [ridesNeeded, setRidesNeeded] = useState(1);
  const [house, setHouse] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to request a ride.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('ride_requests')
      .insert({
        taker_name: name,
        rides_needed: ridesNeeded,
        house,
        date,
        taker_id: user.id, // Clerk user ID
      })
      .select()
      .single();

    if (error) {
      alert('Error creating ride request: ' + error.message);
      return;
    }

    navigate('/dashboard', { state: { request: data } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request a Ride</h2>
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Rides Needed" value={ridesNeeded} onChange={e => setRidesNeeded(e.target.value)} required />
      <input type="text" placeholder="House" value={house} onChange={e => setHouse(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Request Ride</button>
    </form>
  );
}
