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
<div className="min-h-screen bg-cover bg-no-repeat px-4 py-6 flex flex-col items-center" style={{ backgroundImage: "url('/BG-2.png')" }}>
<div className="w-full max-w-screen-lg">
      {/* Header */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 py-4 px-2">

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
        <h1 className="bg-gradient-to-r mb-6 mt-10 from-orange-500 to-orange-300 bg-clip-text text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent text-center">
    Jay Swaminarayan <br />Das na Das Banavsoji!
  </h1>

        <blockquote className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 italic dark:text-white max-w-screen-md mx-auto">

    When
    <span className="relative ml-1 inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-500">
      <span className="relative text-white dark:text-gray-950">Prayer </span>
    </span> becomes habit, miracles become your lifestyle!
  </blockquote>

      {/* Profile Image */}
      <img
  src={profileImage}
  alt="Profile"
  className="w-full max-w-md h-60 object-contain mt-4 rounded-xl shadow-md"
/>


      {/* Ride Buttons */}
      <SignedIn>
        {!showRideTakerForm ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full max-w-md mx-auto px-2">
  <Link to="/ride-giver-list" className="w-full">
    <button className="w-full py-4 text-lg font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 hover:scale-105 active:scale-100 transition-all duration-200 shadow-md">
      🚗 Ride Giver
    </button>
  </Link>
  <Link to="/ride-taker" className="w-full">
    <button className="w-full py-4 text-lg font-semibold bg-green-500 text-white rounded-xl hover:bg-green-600 hover:scale-105 active:scale-100 transition-all duration-200 shadow-md">
      🧍 Ride Taker
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
    </div>
  );
}
