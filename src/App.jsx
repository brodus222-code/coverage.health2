import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import PageViewTracker from './components/PageViewTracker';
import CallClickTracker from './components/CallClickTracker';
// Add page imports here
import Home from './pages/Home';
import VariantB from './pages/VariantB';
import VariantC from './pages/VariantC';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import StateLander from './pages/StateLander';
import CategoryLander from './pages/CategoryLander';
import LeadsDashboard from './pages/LeadsDashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ThankYou from './pages/ThankYou';
import Quote from './pages/Quote';
import Ppo89 from './pages/Ppo89';
import Under65Plans from './pages/Under65Plans';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclosures from './pages/Disclosures';
import Campaigns from './pages/Campaigns';
import Ops from './pages/Ops';
import HealthInsuranceGuide from './pages/HealthInsuranceGuide';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<Home />} />
      <Route path="/b" element={<VariantB />} />
      <Route path="/c" element={<VariantC />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/health-insurance/:stateSlug" element={<StateLander />} />
      <Route path="/coverage/:categorySlug" element={<CategoryLander />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/leads-dashboard" element={<LeadsDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      <Route path="/quote" element={<Quote />} />
      <Route path="/ppo-89" element={<Ppo89 />} />
      <Route path="/under-65-plans" element={<Under65Plans />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/disclosures" element={<Disclosures />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/ops" element={<Ops />} />
      <Route path="/health-insurance-guide" element={<HealthInsuranceGuide />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <PageViewTracker />
          <CallClickTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App