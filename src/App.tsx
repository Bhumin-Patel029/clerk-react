import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import RideTakerForm from './components/RideTakerForm';

export default function App() {
  const [showRideTakerForm, setShowRideTakerForm] = useState(false);

  const handleRideTakerClick = () => setShowRideTakerForm(true);

  const handleFormSubmit = () => {
    setShowRideTakerForm(false);
    // You can handle form data here or show a success message
  };
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center justify-start"
      style={{ backgroundImage: "url('/BG-2.png')" }}
    >
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <SignedOut>
          <div style={{ marginLeft: 'auto' }}>
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
                  <Link to="/dashboard">
  <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
    Go to Dashboard
  </button>
</Link>
          <div style={{ marginLeft: 'auto' }}>
            <UserButton />
          </div>
        </SignedIn>


      </header>

      {/* Heading */}
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold py-4">
        Jay Swaminarayn Das na Das Banavsoji!
      </h1>

      {/* Conditional rendering for Ride Giver and Ride Taker buttons */}
      <SignedIn>
        {!showRideTakerForm ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6 px-4">
            <Link to="/ride-giver" className="w-full sm:w-1/3">
            <button className="w-full sm:w-1/3 px-8 py-5 text-xl bg-orange-500 text-white rounded-xl hover:bg-blue-700 transition-all">
              Ride Giver
            </button>
            </Link>
            <Link to="/ride-taker" className="w-full sm:w-1/3">
          <button className="w-full px-8 py-5 text-xl bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all">
            Ride Taker
          </button>
        </Link>
          </div>
        ) : (
          <RideTakerForm onSubmit={handleFormSubmit} />
        )}
      </SignedIn>

      {/* Show message or other content when signed out */}
      <SignedOut>
        <p className="text-center text-lg mt-6">Please sign in to continue.</p>
      </SignedOut>
    </div>
  );
}
