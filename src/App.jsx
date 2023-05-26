import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

import Navbar from "./components/Navbar";

import { useAuthContext } from "./context/useAuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { authIsReady } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
