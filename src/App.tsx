import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from './assets/Thakorji_1920-1080.jpg';
// @ts-ignore
import RideTakerForm from './components/RideTakerForm';

export default function App() {
  const [showRideTakerForm, setShowRideTakerForm] = useState(false);

  const handleRideTakerClick = () => setShowRideTakerForm(true);

  const handleFormSubmit = () => {
    setShowRideTakerForm(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center justify-start px-4"
      style={{ backgroundImage: "url('/BG-2.png')" }}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 px-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </header>

      {/* Title */}
      <h1 className="text-center px-12 py-12 text-xl sm:text-2xl md:text-3xl font-semibold mt-6">
        Jay Swaminarayn Das na Das Banavsoji!
      </h1>

      {/* Profile Image */}
      <img
        src={profileImage}
        alt="Profile"
        className="w-120 h-120 object-contain mt-4 rounded-xl shadow-md"
      />

      {/* Ride Buttons */}
      <SignedIn>
        {!showRideTakerForm ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full max-w-sm">
            <Link to="/ride-giver" className="w-full">
              <button className="w-full py-4 text-lg bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all">
                Ride Giver
              </button>
            </Link>
            <Link to="/ride-taker" className="w-full">
              <button className="w-full py-4 text-lg bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all">
                Ride Taker
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full px-4 mt-4">
            <RideTakerForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </SignedIn>

      {/* Signed Out Message */}
      <SignedOut>
        <p className="text-center text-base mt-6 text-gray-700">Please sign in to continue.</p>
      </SignedOut>
    </div>
  );
}
