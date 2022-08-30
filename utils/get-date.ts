/**
 * 타임 스탭프를 한국어로 반환합니다.
 */
export default (timestamp: number): string => {
  const now = new Date();
  const time = new Date(timestamp);

  const basicResult = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}.`;
  }

  const hh_mm = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    let status = "낮";

    if (hours < 12) status = "오전";
    if (hours > 12) {
      status = "오후";
      hours -= 12;
    }
    if (hours === 24) {
      status = "밤";
      hours = 12;
    }

    return `${status} ${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  let result = basicResult(time);
  const type = now.getDate() - time.getDate();

  if (type < 3) {
    let status = "";
    switch (type) {
      case 1:
        status = "어제";
        break;
      case 2:
        status = "그저께";
        break;
      default:
        status = "오늘";
        break;
    }

    result = `${status} ${hh_mm(time)}`;
  }

  return result;
}