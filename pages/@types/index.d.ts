interface ResponseResult {
  message: string;
  user?: string;
}

// Discord API Result
interface DiscordToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  avatar_decoration: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  banner_color: string;
  accent_color: number;
  locale: string;
  mfa_enabled: boolean;
  email: string;
  verified: boolean;
}

type APIDiscordUser = Omit<DiscordUser, "flags" | "locale" | "mfa_enabled" | "email" | "verified"> & { avatarUrl?: string; };

interface DDiscordUser {
  id: string;
  username: string;
  avatarUrl: string;
}

// Chat
interface IRequest {
  type: string;
  user?: IUser;
  message: string;
  timestamp: number;
}

interface IUser {
  username: string;
  avatar_url: string;
}

interface IStack {
  key: string;
  value: string;
}

interface IEmbed {
  title?: string;
  description?: string;
  color?: string;
  stacks?: IStack[];
  thumbnail?: string;
}

interface IMessage {
  system?: boolean;
  user?: IUser;
  content?: string;
  embeds?: IEmbed[];
  timestamp: number;
}