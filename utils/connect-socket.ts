import io from "socket.io-client";

/**
 * Socket 서버에 연결합니다.
 */
export default async () => {
  await fetch("/api/chat/socketio");
  const socket = io();

  socket.on("connect", () => {
    console.log("Connect.");
  });

  socket.on("disconnect", () => {
    console.log("Disconnect.");
  });

  return socket;
}