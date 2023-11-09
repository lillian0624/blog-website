import React, { useState, useRef } from "react";
import "../styles/App.css";
import { Auth } from "../components/Auth";
import { Chat } from "../components/Chat";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LiveChat() {
  //   const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  //   if (!isAuth)
  //     return (
  //       <div>
  //         <Auth />
  //       </div>
  //     );

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}{" "}
    </div>
  );
}

export default LiveChat;
