import { useEffect, useState } from "react";
import type { NextPage } from "next";

import Head from "next/head";
import axios from "axios";

import Navigation from "../components/Navigation";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";

import connectSocket from "./utils/connect-socket";

const Home: NextPage = () => {
  // Set user.
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<DiscordUser | undefined>(undefined);

  // Set messages.
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Set connect.
  const [connect, setConnect] = useState<boolean>(false);
  
  const [users, setUsers] = useState<number>(0);
  const [ousers, setOusers] = useState<SUsers[]>([]);

  useEffect(() => {
    const socketInitializer = async () => {
      // Connect socket server.
      const socket = await connectSocket();
      if (!connect) setConnect(true);

      const login = localStorage.getItem("login");
      if (!login) {
        const messageContainer = document.querySelector("div.message-container");
        if (messageContainer) messageContainer.scroll(0, messageContainer.scrollHeight);
        return;
      }

      // Init
      socket.emit("NEW_USER", { login });

      socket.on("RECIVE_MESSAGE", async (response) => {
        setMessages(response.list);

        socket.emit("ONLINE_USER", {});
        socket.on("RESULT", async (response) => {
          setUsers(response.count);
          setOusers(response.list);
        });
      });
    }

    socketInitializer();
  }, []);

  useEffect(() => { // New Message
    const messageContainer = document.querySelector("div.message-container");
    if (messageContainer) messageContainer.scroll(0, messageContainer.scrollHeight);
  }, [messages]);

  useEffect(() => { // Check auth.
    const login = localStorage.getItem("login");
    if (!login) {
      setLoading(false);
      return;
    }

    axios(`${process.env.BACKEND}/user`, {
      method: "POST",
      data: { key: login }
    }).then(res => {
      setUser(JSON.parse(res.data.user));
      setLoading(false);
    }).catch(() => {
      localStorage.removeItem("login");
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Online Chat.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation user={loading || user} users={users} ousers={ousers} />
      <Messages data={messages} />
      <MessageInput
        connect={!connect || loading || user}
        sendMessage={async () => {
          if (loading || !connect) return;

          const login = localStorage.getItem("login");
          if (!login) return;

          const input = document.querySelector("input.content") as HTMLInputElement;
          const value = input.value?.trim();

          if (!value || value.length > 2100) return; // Check value.
          
          (document.querySelector("input.content") as HTMLInputElement).value = "";

          // Send message.
          const socket = await connectSocket();
          socket.emit("SEND_MESSAGE", { login, content: value });
          socket.on("RECIVE_MESSAGE", async (response) => {
            setMessages(response.list);
          });
        }}/>
    </>
  )
}

export default Home;