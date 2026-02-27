import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import { useAuthSync } from "./hooks/useAuthSync";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectSiteData } from "./features/siteData/siteDataSelectors";
import { getMainSiteData } from "./features/siteData/siteDataSlice";

function App() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  // Enable cross-tab authentication synchronization
  useAuthSync();

  useEffect(() => {
    if (!siteData) {
      dispatch(getMainSiteData());
    }
  }, [siteData, dispatch]);

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
