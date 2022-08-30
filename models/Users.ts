import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema<SUsers>({
  id: { type: String, unique: true },
  username: { type: String },
  avatarUrl: { type: String }
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);