import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema<SMessages>({
  data: {
    system: Boolean,
    user: { type: { username: String, avatar_url: String } },
    content: String,
    embeds: [
      {
        title: String,
        description: String,
        color: String,
        stacks: [
          {
            key: String,
            value: String
          }
        ],
        thumbnail: String
      }
    ],
    dev: { type: Boolean },
    timestamp: Number
  }
});

export default mongoose.models.Messages || mongoose.model("Messages", MessagesSchema);