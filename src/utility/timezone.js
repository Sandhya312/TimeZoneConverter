import moment from "moment-timezone";

const now = new Date();

const createTimeZoneObject = (name, label, fullForm) => {
  const dateTimeMoment = moment(now).tz(name);
  return {
    name,
    label,
    fullForm,
    sliderValue: dateTimeMoment.hour() * 60 + dateTimeMoment.minute(),
    dateTime: dateTimeMoment.format("DD:MM:YYYY hh:mm a"),
    dateTimeMoment,
    offset: dateTimeMoment._offset,
  };
};

export const timezone = [
  createTimeZoneObject("Asia/Kolkata", "IST", "Indian Standard Time"),
  createTimeZoneObject("UTC", "UTC", "Universal Time Coordinated"),
  createTimeZoneObject("America/New_York", "EST", "Eastern Standard Time"),
  createTimeZoneObject("Asia/Tokyo", "JST", "Japan Standard Time"),
  createTimeZoneObject("GMT", "GMT", "Greenwich Mean Time"),
  createTimeZoneObject("Australia/Sydney", "AEST", "Australian Eastern Standard Time"),
  createTimeZoneObject("Europe/London", "BST", "British Summer Time"),
  createTimeZoneObject("America/Los_Angeles", "PST", "Pacific Standard Time"),
  createTimeZoneObject("Asia/Dubai", "GST", "Gulf Standard Time"),
  createTimeZoneObject("Africa/Johannesburg", "SAST", "South Africa Standard Time"),
  createTimeZoneObject("Asia/Shanghai", "CST", "China Standard Time"),
  createTimeZoneObject("Europe/Berlin", "CEST", "Central European Summer Time"),
  createTimeZoneObject("America/Sao_Paulo", "BRT", "Brasília Time"),
];
