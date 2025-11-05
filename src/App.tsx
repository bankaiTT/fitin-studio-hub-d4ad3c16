import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WorkoutPlanner from "./pages/WorkoutPlanner";
import DietPlanner from "./pages/DietPlanner";
import MaintenanceDietLogs from "./pages/MaintenanceDietLogs";
import PersonalDetails from "./pages/PersonalDetails";
import Premium from "./pages/Premium";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import TrainersPage from "./pages/TrainersPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import NutritionTracker from "./pages/NutritionTracker";
import PremiumNutritionTracker from "./pages/PremiumNutritionTracker";
import NotFound from "./pages/NotFound";
import SkinnyToMuscularPlan from "./pages/SkinnyToMuscularPlan";
import FatToMuscularPlan from "./pages/FatToMuscularPlan";
import HomeWorkoutPlan from "./pages/HomeWorkoutPlan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-planner" element={<WorkoutPlanner />} />
          <Route path="/diet-planner" element={<DietPlanner />} />
          <Route path="/maintenance-diet-logs" element={<MaintenanceDietLogs />} />
          <Route path="/nutrition-tracker" element={<NutritionTracker />} />
          <Route path="/premium-nutrition-tracker" element={<PremiumNutritionTracker />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/skinny-to-muscular-plan" element={<SkinnyToMuscularPlan />} />
          <Route path="/fat-to-muscular-plan" element={<FatToMuscularPlan />} />
          <Route path="/home-workout-plan" element={<HomeWorkoutPlan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
