import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import { useAuthSync } from "./hooks/useAuthSync";
import "locomotive-scroll/dist/locomotive-scroll.css";

function App() {
  // Enable cross-tab authentication synchronization
  useAuthSync();

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
