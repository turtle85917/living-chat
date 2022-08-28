import getMessage from "./get-message";

/**
 * 보낼 메시지 내용을 구합니다.
 * @param request 보낼 내용
 */
export default (request: IRequest): IMessage => {
  return {
    user: request.user,
    system: !request.user,
    content: getMessage(request.type, request.message),
    timestamp: request.timestamp
  };
}