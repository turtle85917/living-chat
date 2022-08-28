import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../@types/chat";

import axios from "axios";

import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

import connectDb from "../../utils/connect-db";
import reciveMessage from "../../utils/recive-message";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New socket.io server...");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer);

    io.on("connection", async (socket) => {
      const database = await connectDb();
      socket.join("online-chat"); // Join "online-chat"

      socket.on("NEW_USER", async (requestData) => { // Connect new user.
        const { login } = requestData;

        try {
          const LoginUser: DiscordUser = JSON.parse((await axios(`${process.env.BACKEND}/user`, {
            method: "POST",
            data: { key: login }
          })).data.user);

          const res = await database.get("SELECT * FROM ousers WHERE user_id = ?", [ LoginUser.id ]);

          if (res) await database.run("UPDATE ousers SET id = ? WHERE user_id = ?", [ socket.id, LoginUser.id ]);
          else await database.run("INSERT INTO ousers (id, user_id) VALUES (?, ?)", socket.id, LoginUser.id);

          const user: DDiscordUser | undefined = await database.get("SELECT * FROM users WHERE id = ?", [ LoginUser.id ]);
          if (!user) {
            throw new Error("유저가 존재하지 않아요.");
          }

          if (!res) {
            const type = "NEW_USER";
            await database.run("INSERT INTO messages (data) VALUES (?)",
              JSON.stringify(reciveMessage({
                message: user.username,
                timestamp: Date.now(), type
              })));

            socket.to("online-chat").emit("RECIVE_MESSAGE", {
              list: (await database.all("SELECT * FROM messages")).map(message => JSON.parse(message.data) as IMessage)
            });
          }
        } catch (e) {
          console.log(e);
        }
      });

      socket.on("SEND_MESSAGE", async (requestData) => { // Save message.
        const { login, content } = requestData;

        try {
          if (!content) {
            throw new Error("메시지 내용 없어요.");
          }
          const LoginUser: DiscordUser = JSON.parse((await axios(`http://localhost:3000/api/user`, {
            method: "POST",
            data: { key: login }
          })).data.user);

          const user: DDiscordUser| undefined = await database.get("SELECT * FROM users WHERE id = ?", [ LoginUser.id ]);
          if (!user) {
            throw new Error("유저가 존재하지 않아요.");
          }

          const type = "MESSAGE";
          await database.run("INSERT INTO messages (data) VALUES (?)",
            JSON.stringify(reciveMessage({
              message: content,
              user: { username: user.username, avatar_url: user.avatarUrl },
              timestamp: Date.now(), type
            })));

          socket.to("online-chat").emit("RECIVE_MESSAGE", {
            list: (await database.all("SELECT * FROM messages")).map(message => JSON.parse(message.data) as IMessage)
          });
        } catch (e) {
          console.log(e);
        }
      });

      socket.on("ONLINE_USER", async () => { // Check online users.
        const ousers = await database.all("SELECT * FROM ousers");
        const result: DDiscordUser[] = [];
        for (const ouser of ousers) {
          result.push((await database.get("SELECT * FROM users WHERE id = ?", [ ouser.user_id ]))!);
        }
        
        socket.to("online-chat").emit("RESULT", {
          count: ousers.length,
          list: result
        });
      });

      socket.on("disconnect", async () => { // Disconnect event.
        const ouser = await database.get("SELECT * FROM ousers WHERE id = ?", [ socket.id ]);
        if (!ouser) return;

        const res = await database.get("SELECT * FROM ousers WHERE user_id = ?", [ ouser.user_id ]);
        const user: APIDiscordUser = JSON.parse((await axios(`${process.env.BACKEND}/user/${ouser.user_id}`)).data.user);

        await database.run("DELETE FROM ousers WHERE id = ?", socket.id);

        if (res) {
          const type = "DISCONNECT";
          await database.run("INSERT INTO messages (data) VALUES (?)",
            JSON.stringify(reciveMessage({
              message: user.username,
              timestamp: Date.now(), type
            })));

          socket.to("online-chat").emit("RECIVE_MESSAGE", {
            list: (await database.all("SELECT * FROM messages")).map(message => JSON.parse(message.data) as IMessage)
          });
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}