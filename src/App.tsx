import { useEffect } from "react";
import Index from "./pages/Index";

function App() {
  useEffect(() => {
    try {
      const { CapacitorUpdater } = require("@capgo/capacitor-updater");
      CapacitorUpdater.notifyAppReady();
    } catch (e) {
      console.log("Updater not available");
    }
  }, []);

  return <Index />;
}

export default App;
