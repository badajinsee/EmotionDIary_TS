// Input창에 오늘의 날짜 기본 값으로 넣기
export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 월이 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  if (month < 10) {
    month = `0${month}`;
  }
  // 일자가 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};
