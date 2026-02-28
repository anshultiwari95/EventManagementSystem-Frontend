import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const ZONE_OPTIONS = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Greenwich Mean Time (GMT)", value: "Europe/London" },
  { label: "India Standard Time (IST)", value: "Asia/Kolkata" },
];

export const convertUTCToTimezone = (utcDate, tz) => {
  return dayjs.utc(utcDate).tz(tz);
};

export const formatDateTime = (dateObj) => {
  return dateObj.format("YYYY-MM-DD HH:mm");
};

export const getAllTimezones = () => {
  if (typeof Intl.supportedValuesOf === "function") {
    return Intl.supportedValuesOf("timeZone");
  }

  // Fallback (older browsers)
  return [
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London"
  ];
};