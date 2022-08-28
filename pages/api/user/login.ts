import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connect-db";

import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse<ResponseResult>) => {
  const database = await connectDb();

  if (req.method === "POST") {
    const { code } = req.body;
    if (!code) {
      res.status(400).json({ message: "코드가 없어요." });
      return;
    }

    const tokenResponseData: DiscordToken = (await axios("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.FRONTEND}/redirect`,
        scope: "identify"
      })
    })).data;

    const key = Math.random().toString(36).slice(2, 15);

    await database.run("INSERT INTO oauth2 (key, access_token) VALUES (?, ?)", key, tokenResponseData.access_token);

    res.status(200).json({ message: key });
    return;
  }
}