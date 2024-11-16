
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import PricingPage from './pages/pricing-page';
import ContactsPage from './pages/contacts-page';
import GSPage from './pages/get-started-page';

function App() {

  return (
    <Router>
    <Routes>
      {/* Define the route to the landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactsPage />} />
      <Route path="/getstarted" element={<GSPage />} />
    </Routes>
  </Router>
  )
}

export default App
