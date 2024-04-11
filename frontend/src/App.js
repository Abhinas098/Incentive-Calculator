import React, { useContext } from "react";
import NavBar from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";

import Routers from "./Routes";
import AuthCtx from "./context/AuthCtx";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const { isLogin } = useContext(AuthCtx);

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <Routers />
      {isLogin && <Footer />}
    </div>
  );
}

export default App;
