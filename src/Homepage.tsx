import Landing from "./pages/landing/Landing";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";

interface HomepageProps {
  goToPage: (path: string) => void;
}

export default function Homepage({ goToPage }: HomepageProps) {
  return (
    <div>
      <div style={{ zIndex: 100, position: "relative" }}>
        <DrawingPreloader />
      </div>
      <div style={{ zIndex: 50, position: "relative" }}>
    
        <Landing goToPage={goToPage} />
      </div>
    </div>
  );
}
