import { Routes, Route, useLocation } from "react-router-dom";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import Landing from "./pages/landing/Landing";
import { useState } from "react";
import Registration from "./pages/registration/Registration";
import Instructions from "./pages/instructions/instructions";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
      <Route path="/instructions" element ={<Instructions/>}></Route>
    </Routes>
  );
}
