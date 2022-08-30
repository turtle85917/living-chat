import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import connectDb from "../../utils/connect-db";
import getAvatar from "../../utils/get-avatar";

import Oauth2 from "../../models/Oauth2";
import Users from "../../models/Users";

export default  async (req: NextApiRequest, res: NextApiResponse<ResponseResult>) => {
  if (req.method === "POST") {
    await connectDb();
    const { key } = req.body;

    if (!key) {
      res.status(400).json({ message: "올바른 키 값을 넣어주세요." });
      return;
    }

    const result = await Oauth2.findOne({ key });

    if (!result) {
      res.status(400).json({ message: "로그인을 해주세요." });
      return;
    }

    const userResponse: DiscordUser = (await axios("https://discord.com/api/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${result.access_token}`
      }
    })).data;

    const user = await Users.findOne({ id: userResponse.id });
    if (!user) {
      const nuser = new Users({
        id: userResponse.id,
        username: userResponse.username,
        avatarUrl: getAvatar(userResponse)
      });
      await nuser.save();
    }

    res.status(200).json({ user: JSON.stringify(userResponse), message: "ok." });
  }
};