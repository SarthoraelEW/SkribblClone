import React, { useContext, useEffect, useState } from "react";
import MuteButton from "../components/MuteButton";
import Header from "../components/PrivateRoom/Header";
import Settings from "../components/PrivateRoom/Settings";
import Players from "../components/PrivateRoom/Players";
import Footer from "../components/PrivateRoom/Footer";
import { useSearchParams } from "react-router-dom";
import { SocketContext } from "../components/AppContext";

const PrivateRoom = () => {
  const socket = useContext(SocketContext);

  const [searchParams] = useSearchParams();

  const [room, setRoom] = useState(null);

  const tokenRoom = searchParams.get("room");

  socket.emit("get_room", { room: tokenRoom });

  window.onbeforeunload = () => {
    socket.emit("leave_room", {
      token: room.tokenRoom,
    });
  };

  useEffect(() => {
    socket.on("response_get_room", (data) => {
      setRoom(data.room);
    });

    socket.on("player_join", (data) => {
      setRoom(data.room);
    });

    socket.on("update_room", (data) => {
      setRoom(data.room);
    });
  });

  return (
    <div className="page">
      <MuteButton />
      {room !== null && (
        <div className="page-container">
          <Header />
          <div className="privateRoom">
            <div className="roomInformations">
              <Settings room={room} token={tokenRoom} />
              <Players room={room} />
            </div>
            <Footer token={tokenRoom} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateRoom;
