import { useLocation } from 'react-router-dom';

export default function RideTakerDashboard() {
  const location = useLocation();
  const { name, rides, house } = location.state || {};

  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold text-green-700">Welcome, {name}!</h2>
        <p className="text-lg">📍 House: <strong>{house}</strong></p>
        <p className="text-lg">🚗 Rides Needed: <strong>{rides}</strong></p>

        <p className="text-sm text-gray-500 mt-4 italic">Waiting for a ride giver to match you…</p>
      </div>
    </div>
  );
}
