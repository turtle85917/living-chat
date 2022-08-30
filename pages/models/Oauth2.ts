import mongoose from "mongoose";

const Oauth2Schema = new mongoose.Schema<SOauth2>({
  key: { type: String, unique: true },
  access_token: { type: String }
});

export default mongoose.models.Oauth2 || mongoose.model("Oauth2", Oauth2Schema);