import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SignIn from './pages/authentication/signin';
import SignUp from './pages/authentication/signup';
import Dashboard from './pages/dashboard';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signin" element ={<SignIn />} />
      <Route path="/signup" element= {<SignUp /> } />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  )
}

export default App