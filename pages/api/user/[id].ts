import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default  async (req: NextApiRequest, res: NextApiResponse<ResponseResult>) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const user: APIDiscordUser = (await axios(`https://discord.com/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`
      }
    })).data;

    res.status(200).json({ message: "ok.", user: JSON.stringify(user) });
  }
}