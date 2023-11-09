import React, { useState } from "react";
import "../App.css";
import { Auth } from "../components/Auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LiveChat() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  //   if (!isAuth)
  //     return (
  //       <div>
  //         <Auth />
  //       </div>
  //     );

  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input />
          <button>Enter Chat</button>
        </div>
      )}{" "}
    </div>
  );
}

export default LiveChat;
