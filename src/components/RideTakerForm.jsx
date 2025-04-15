import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RideTakerForm() {
  const [name, setName] = useState('');
  const [rides, setRides] = useState(1);
  const [house, setHouse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   // alert(`Name: ${name}, Rides: ${rides}, House: ${house}`);

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: "url('./BG-2.png')" }}
    >
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Ride Taker Form</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border"
          required
        />

        <input
          type="number"
          placeholder="Number of Rides Needed"
          value={rides}
          min="1"
          onChange={(e) => setRides(e.target.value)}
          className="w-full p-2 rounded border"
          required
        />

        <select
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          className="w-full p-2 rounded border"
          required
        >
          <option value="">Select Your House</option>
          <option value="House A">47 Elgin Drive</option>
          <option value="House B">56 Elgin Drive</option>
          <option value="House C">64 Elgin Drive</option>
          <option value="House D">Towers 16</option>
          <option value="House E">Towers 17</option>
          <option value="House H">Others</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
