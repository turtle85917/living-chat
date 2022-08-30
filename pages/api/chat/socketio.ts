import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../@types/chat";

import axios from "axios";

import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

import connectDb from "../../../utils/connect-db";
import reciveMessage from "../../../utils/recive-message";

import Users from "../../../models/Users";
import Ousers from "../../../models/Ousers";
import Messages from "../../../models/Messages";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New socket.io server...");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer);

    io.on("connection", async (socket) => {
      await connectDb();
      socket.join("public-room"); // Join "public-room"

      socket.on("NEW_USER", async (requestData) => { // Connect new user.
        const { login } = requestData;

        try {
          const LoginUser: DiscordUser = JSON.parse((await axios(`${process.env.BACKEND}/user`, {
            method: "POST",
            data: { key: login }
          })).data.user);

          const res = await Ousers.findOne({ user_id: LoginUser.id });

          if (res) {
            await Ousers.findOneAndUpdate({ user_id: LoginUser.id }, { id: socket.id });
          } else {
            const ouser = new Ousers({ id: socket.id, user_id: LoginUser.id });
            await ouser.save();
          }

          const user = await Users.findOne({ id: LoginUser.id });
          if (!user) {
            throw new Error("유저가 존재하지 않아요.");
          }

          const type = "NEW_USER";

          const message = new Messages({
            data: reciveMessage({ message: user.username, timestamp: Date.now(), type })
          });
          await message.save();

          socket.to("public-room").emit("RECIVE_MESSAGE", {
            list: (await Messages.find()).map(m => m.data)
          });
        } catch (e) {
          console.log(e);
        }
      });

      socket.on("SEND_MESSAGE", async (requestData) => { // Save message.
        const { login, content } = requestData;

        try {
          socket.to("public-room").emit("NEW_USER", { login });

          if (!content) {
            throw new Error("메시지 내용 없어요.");
          }
          const LoginUser: DiscordUser = JSON.parse((await axios(`${process.env.BACKEND}/user`, {
            method: "POST",
            data: { key: login }
          })).data.user);

          const user = await Users.findOne({ id: LoginUser.id });
          if (!user) {
            throw new Error("유저가 존재하지 않아요.");
          }

          const type = "MESSAGE";

          const message = new Messages({
            data: reciveMessage({ message: content, user: { username: user.username, avatar_url: user.avatarUrl }, timestamp: Date.now(), type })
          });
          await message.save();

          socket.to("public-room").emit("RECIVE_MESSAGE", {
            list: (await Messages.find()).map(m => m.data)
          });
        } catch (e) {
          console.log(e);
        }
      });

      socket.on("ONLINE_USER", async () => { // Check online users.
        const ousers = await Ousers.find();
        const users = await Users.find();

        const result = [];
        for (const ouser of ousers) {
          result.push(users.find(u => u.id === ouser.user_id));
        }
        
        socket.to("public-room").emit("RESULT", {
          count: ousers.length,
          list: result
        });
      });

      socket.on("disconnect", async () => { // Disconnect event.
        const ouser = await Ousers.findOne({ id: socket.id });
        if (!ouser) return;

        const res = await Ousers.findOne({ user_id: ouser.user_id });
        const user: APIDiscordUser = JSON.parse((await axios(`${process.env.BACKEND}/user/${ouser.user_id}`)).data.user);

        await Ousers.deleteOne({ id: socket.id });

        if (res) {
          const type = "DISCONNECT";

          const message = new Messages({
            data: reciveMessage({ message: user.username, timestamp: Date.now(), type })
          });
          await message.save();

          socket.to("public-room").emit("RECIVE_MESSAGE", {
            list: (await Messages.find()).map(m => m.data)
          });
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}