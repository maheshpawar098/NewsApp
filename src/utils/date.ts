const getDateFormat = (secounds: number) => {
  const date = new Date(secounds);

  let hours: any = date.getHours();
  let min: any = date.getMinutes();
  let amPm = 'am';
  if (hours >= 12) {
    // hours = hours - 12;
    if (hours !== 12) {
      hours = hours - 12;
    }
    amPm = 'pm';
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (min < 10) {
    min = '0' + min;
  }

  return hours + '.' + min + ' ' + amPm;
};

const getTimeFormat = (date1: Date) => {
  const date2 = new Date();
  date2.setHours(0, 0, 0, 0);
  date1.setHours(0, 0, 0, 0);

  if (date2.getTime() === date1.getTime()) {
    return 'Today';
  }

  if (
    new Date(date2.setDate(date2.getDate() - 1)).getTime() === date1.getTime()
  ) {
    return 'Yesterday';
  }

  const date = date1.getDate();
  const month = date1.getMonth() + 1;
  const year = date1.getFullYear();

  return date + '/' + month + '/' + year;
};

const dateFormat = (seconds: number) => {
  // Today
  const currentMsgTime = new Date(seconds*1000);

  const formatedDate = getTimeFormat(currentMsgTime);

  if (formatedDate !== 'Today') {
    return formatedDate;
  }

  return getDateFormat(seconds*1000);
};

export {getDateFormat, getTimeFormat, dateFormat};
