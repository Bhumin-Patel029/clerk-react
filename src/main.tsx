import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // import App from the TypeScript file
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import RideGiverList from './components/RideGiverList'; // import it
// @ts-ignore
import RideTakerForm from './components/RideTakerForm'; // import RideTakerForm (JSX)
// @ts-ignore
import Dashboard from './components/Dashboard';
// @ts-ignore
import GiverDashboard from './components/GiverDashboard';
// @ts-ignore
import RideGiverForm from './components/RideGiverForm';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>


<Routes>
  <Route path="/" element={<App />} />
  <Route path="/ride-taker" element={<RideTakerForm />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/ride-giver-list" element={<RideGiverList />} />
  <Route path="/ride-giver" element={<RideGiverForm />} />
  <Route path="/giverdashboard" element={<GiverDashboard />} />
</Routes>

      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
