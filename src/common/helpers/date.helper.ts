const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };

export function compareInSeconds(dateA: any, dateB: any) {
  // Parse the dates using Day.js
  const firstDate = dayjs(dateA);
  const secondDate = dayjs(dateB);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = secondDate.diff(firstDate);

  // Convert the difference to seconds
  const diffInSeconds = diffInMilliseconds / 1000;

  return diffInSeconds;
}

export const dayNow = dayjs().tz('Asia/Jakarta').format(); // daynow jakarta

export const monthAgo = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
