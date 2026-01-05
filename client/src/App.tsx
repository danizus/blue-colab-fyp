import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AIChatAssistant } from "@/components/AIChatAssistant";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import JobSearchPage from "./pages/JobSearchPage";
import JobDetailPage from "./pages/JobDetailPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJobPage from "./pages/PostJobPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/jobs" element={<JobSearchPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/resume" element={<ResumeUploadPage />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/recruiter/post-job" element={<PostJobPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
