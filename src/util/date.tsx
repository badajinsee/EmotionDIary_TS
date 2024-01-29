// Input창에 오늘의 날짜 기본 값으로 넣기
export const getStringDate = (date: Date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 월이 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  const monthStr = month < 10 ? `0${month}` : `${month}`;

  // 일자가 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  const dayStr = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${monthStr}-${dayStr}`;
};
