
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';

function App() {

  return (
    <Router>
    <Routes>
      {/* Define the route to the landing page */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </Router>
  )
}

export default App
