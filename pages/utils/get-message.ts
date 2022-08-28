/**
 * 메시지 타입에 따라 메시지 내용을 구합니다.
 * @param type 메시지 타입
 * @param message 메시지 내용
 */
export default (type: string, message: string): string | undefined => {
  switch (type) {
    case "NEW_USER":
      return `👋 ${message} 님이 들어왔어요.`;
    case "DISCONNECT":
      return `😭 ${message} 님이 나갔어요.`;
    case "MESSAGE":
      return message;
    default:
      return undefined;
  }
}