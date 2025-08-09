import { Routes, Route } from "react-router-dom";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import Landing from "./pages/landing/Landing";
import { useState } from "react";
import Registration from "./pages/Registration/Registration";
import Instructions from "./pages/Instructions/Instructions";
import Events from "./pages/Events/Events";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const location = useLocation();

  const handleEnter = () => {
    setIsLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoading ? (
            <DrawingPreloader onEnter={handleEnter} />
          ) : (
            <Landing />
          )
        }
      />
      <Route path="/register" element={<Registration />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}
