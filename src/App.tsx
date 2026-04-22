
import { useEffect } from "react";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import Index from "./pages/Index";

function App() {
  useEffect(() => {
    CapacitorUpdater.notifyAppReady();
  }, []);

  return <Index />;
}

export default App;
