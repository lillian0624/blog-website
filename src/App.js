import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase-config";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatPost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import LiveChat from "./pages/LiveChat";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUseOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>

        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createpost">Create Post</Link>
            <button onClick={signUseOut}>Log Out</button>
            <Link to="/livechat">LiveChat</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/livechat" element={<LiveChat />} />
      </Routes>
    </Router>
  );
}

export default App;
