/**
 * 아바타 이미지 URL을 구합니다.
 * @param user 디스코드 유저
 */
export default (user: DiscordUser): string => {
  if (user.avatar?.startsWith("a_")) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar.slice(2)}.png?size=1024`;
  }
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;
  }
  return `https://cdn.discordapp.com/embed/avatars/${+user.discriminator % 4}.png`;
}