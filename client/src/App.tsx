import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SignIn from './pages/authentication/signin';
import SignUp from './pages/authentication/signup';
import Layout from './pages/lay-out';
import Dashboard from './pages/dashboard';
import Depression from './pages/assessments/depression-page';
import Anxiety from './pages/assessments/anxiety-page';
import Settings from './pages/settings/settings-page';
import ChangeUsername from './pages/settings/changename-page';
import AdminDashboard from './pages/admin-pages/admin-dashboard';
import AdminUserManagement from './pages/admin-pages/admin-usermanagement';
import AssessmentCreation from './pages/admin-pages/admin-assessments';

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
          <Route path="/admin" element ={<AdminDashboard/>} />
          <Route path="/admin/employees" element={<AdminUserManagement/>} />
          <Route path="/admin/assessments" element={<AssessmentCreation/>} />
          <Route path="/settings" element ={<Settings/>} />
          <Route path="/settings/change-username" element ={<ChangeUsername/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
