import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Universities from './pages/Universities';
import Courses from './pages/Courses';
import AboutUs from './pages/AboutUs';
import OurService from './pages/OurService';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUniversities from './pages/admin/Universities';
import AdminCourses from './pages/admin/Courses';
import AdminServices from './pages/admin/Services';
import AdminBlogs from './pages/admin/Blogs';
import AdminStudents from './pages/admin/Students';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-light text-slate-900 font-sans selection:bg-primary/10 selection:text-primary">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><main className="pt-24 md:pt-28"><Home /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/universities" element={<><Navbar /><main className="pt-24 md:pt-28"><Universities /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/courses" element={<><Navbar /><main className="pt-24 md:pt-28"><Courses /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/about" element={<><Navbar /><main className="pt-24 md:pt-28"><AboutUs /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/services" element={<><Navbar /><main className="pt-24 md:pt-28"><OurService /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/blog" element={<><Navbar /><main className="pt-24 md:pt-28"><Blog /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/contact" element={<><Navbar /><main className="pt-24 md:pt-28"><ContactUs /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/login" element={<><Navbar /><main className="pt-24 md:pt-28"><Login /></main><Footer /><WhatsAppButton /></>} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<ProtectedRoute allowedType="agent" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="inquiries" element={<AdminStudents />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
