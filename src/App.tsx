import { Routes, Route } from "react-router-dom";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import { useState } from "react";
import Registration from "./pages/registration/Registration";
//import InTransition from "./pages/components/page-transition/InTransition";

export default function App() {
  const [isLoading2, setIsLoading2] = useState(true);
  // const location = useLocation();

  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/register"
        element={
          isLoading2 ? (
            <Preloader onEnter={() => setIsLoading2(false)} />
          ) : (
            <Registration/>
          )
        }
      />
    </Routes>
  );
}
