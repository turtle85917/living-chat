import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import connectDb from "../../utils/connect-db";
import getAvatar from "../../utils/get-avatar";

export default  async (req: NextApiRequest, res: NextApiResponse<ResponseResult>) => {
  if (req.method === "POST") {
    const database = await connectDb();
    const { key } = req.body;

    if (!key) {
      res.status(400).json({ message: "올바른 키 값을 넣어주세요." });
      return;
    }

    const { access_token } = await database.get("SELECT access_token FROM oauth2 WHERE key = ?", [ key ]);

    if (typeof access_token !== "string") {
      res.status(400).json({ message: "로그인을 해주세요." });
      return;
    }

    const userResponse: DiscordUser = (await axios("https://discord.com/api/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })).data;

    const user = await database.get("SELECT * FROM users WHERE id = ?", [ userResponse.id ]);
    if (!user) {
      await database.run("INSERT INTO users (id, username, avatarUrl)", userResponse.id, userResponse.username, getAvatar(userResponse));
    }

    res.status(200).json({ user: JSON.stringify(userResponse), message: "ok." });
  }
};