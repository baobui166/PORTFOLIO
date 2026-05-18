import { Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import FeedsPage from "./pages/FeedsPage";
import InitPage from "./pages/InitPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InitPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/feeds" element={<FeedsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
