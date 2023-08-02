function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function transDateType(val) {
  if (!(val instanceof Date)) {
    return new Date(val);
  }
  return val;
}

export function formattedWeekDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}
export function formattedWeekDateTime(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${day}일 ${[hour,minute].join(':')}`;
}
export function formattedWeekDateZ(data, delimiter = '-') {
  const dateTime = transDateType(data + 'Z');
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}

export function formattedYearMonthDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth());

  return `${[year, month].join(delimiter)}`;
}
export function formattedMonthDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const day = leftPad(dateTime.getDate());
  const month = leftPad(dateTime.getMonth()+1);

  return `${month+'월 '+day+'일'}`;
}
export function formattedDateAndDay(data, delimiter = '. ') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear().toString().slice(-2);
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} (${dayOfWeek})`;
}