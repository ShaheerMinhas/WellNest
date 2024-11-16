
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SignIn from './pages/authentication/signin';
function App() {

  return (
    <Router>
    <Routes>
      {/* Define the route to the landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path='signin' element={<SignIn />}/>
    </Routes>
  </Router>
  )
}

export default App
