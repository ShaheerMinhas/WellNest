import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SignIn from './pages/authentication/signin';
import SignUp from './pages/authentication/signup';
import Layout from './pages/lay-out';
import Dashboard from './pages/dashboard';
import Depression from './pages/assessments/depression-page';
import Anxiety from './pages/assessments/anxiety-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/depression" element={<Depression />} />
          <Route path="/anxiety" element={<Anxiety />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
