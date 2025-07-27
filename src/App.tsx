import { useState } from "react";
import Landing from "./pages/landing/Landing";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import styles from "./App.module.scss";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnter = () => {
    setIsLoading(false);
    // add music later
  };

  return (
    <div className={styles.root}>
      {isLoading ? <DrawingPreloader onEnter={handleEnter} /> : <Landing />}
    </div>
  );
}
