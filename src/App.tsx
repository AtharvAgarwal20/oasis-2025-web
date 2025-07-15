import { useState } from 'react';
import Landing from "./pages/landing/Landing";
import Preloader from './pages/components/preloader/Preloader'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnter = () => {
    setIsLoading(false);
    // add music later
  };

  return isLoading ? (
    <Preloader onEnter={handleEnter} />
  ) : (
    <Landing />
  );
}