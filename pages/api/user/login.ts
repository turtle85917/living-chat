import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../utils/connect-db";

import axios from "axios";

import Oauth2 from "../../../models/Oauth2";

export default async (req: NextApiRequest, res: NextApiResponse<ResponseResult>) => {
  await connectDb();

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

    let key = Math.random().toString(36).slice(2, 15);

    const accessToken = await Oauth2.findOne({ access_token: tokenResponseData.access_token });

    if (!accessToken) {
      const oauth2 = new Oauth2({
        key,
        access_token: tokenResponseData.access_token
      });
      await oauth2.save();
    } else {
      key = accessToken.key;
    }

    res.status(200).json({ message: key });
    return;
  }
}