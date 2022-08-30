import mongoose from "mongoose";

const OusersSchema = new mongoose.Schema<SOusers>({
  id: { type: String },
  user_id: { type: String }
});

export default mongoose.models.Ousers || mongoose.model("Ousers", OusersSchema);