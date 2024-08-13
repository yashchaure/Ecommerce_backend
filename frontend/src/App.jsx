import { Outlet } from "react-router-dom";
import Navigate from "./pages/Auth/Navigate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigate />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  ); 
}

export default App;
