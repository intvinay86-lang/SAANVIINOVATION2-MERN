import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import "locomotive-scroll/dist/locomotive-scroll.css";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
