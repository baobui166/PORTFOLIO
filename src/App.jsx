import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import FeedsPage from "./pages/FeedsPage";
import InitPage from "./pages/InitPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import OnboardingTour from "./components/ui/OnboardingTour";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape" || event.repeat) {
        return;
      }

      navigate("/");
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<InitPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/feeds" element={<FeedsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <OnboardingTour />
    </>
  );
}
