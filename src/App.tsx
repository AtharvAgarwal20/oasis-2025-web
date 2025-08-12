import { Routes, Route } from "react-router-dom";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Landing from "./pages/landing/Landing";
import { useState } from "react";
import Registration from "./pages/registration/Registration";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  // const location = useLocation();

  const handleEnter = () => {
    setIsLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoading ? <DrawingPreloader onEnter={handleEnter} /> : <Landing />
        }
      />
      <Route
        path="/register"
        element={
          isLoading2 ? (
            <Preloader onEnter={() => setIsLoading2(false)} />
          ) : (
            <Registration />
          )
        }
      />
    </Routes>
  );
}
