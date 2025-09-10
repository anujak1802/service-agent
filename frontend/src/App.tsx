import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from './Components/ComplaintForm';
import AdminDashboard from './Components/AdminDashboard';
import Navigation from './Components/Navigation';
import WelcomePage from './Components/WelcomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/submit" element={<>
            <Navigation />
            <ComplaintForm />
          </>} />
          <Route path="/admin" element={<>
            <Navigation />
            <AdminDashboard />
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;