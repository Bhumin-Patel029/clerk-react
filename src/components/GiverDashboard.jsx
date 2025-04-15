import { useLocation } from 'react-router-dom';

export default function RideGiverDashboard() {
  const location = useLocation();
  const { name, contact, house, readyBy, rideCount } = location.state || {};

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold text-orange-600">Welcome, {name}!</h2>
        <p className="text-lg">📞 Contact Number: <strong>{contact}</strong></p>
        <p className="text-lg">🏠 House: <strong>{house}</strong></p>
        <p className="text-lg">⏰ Ready By: <strong>{readyBy}</strong></p>
        <p className="text-lg">🚗 Rides You Can Offer: <strong>{rideCount}</strong></p>

        <p className="text-sm text-gray-500 mt-4 italic">
          We’ll notify you when someone requests a ride you can provide.
        </p>
      </div>
    </div>
  );
}
