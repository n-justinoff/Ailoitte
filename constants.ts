import { Holiday, HolidayType } from './types';

export const COMPANY_NAME = "Ailoitte";
export const YEAR = 2026;

export const HOLIDAYS: Holiday[] = [
  { date: '2026-01-01', name: "New Year's Day", type: HolidayType.MANDATORY },
  { date: '2026-01-14', name: "Makar Sankranti, Pongal", type: HolidayType.OPTIONAL },
  { date: '2026-01-26', name: "Republic Day", type: HolidayType.MANDATORY },
  { date: '2026-03-04', name: "Holi", type: HolidayType.MANDATORY },
  { date: '2026-03-19', name: "Chandramana Ugadi", type: HolidayType.OPTIONAL },
  { date: '2026-04-03', name: "Good Friday", type: HolidayType.OPTIONAL },
  { date: '2026-04-14', name: "Baisakhi, Bihu", type: HolidayType.OPTIONAL },
  { date: '2026-05-01', name: "Labour Day", type: HolidayType.MANDATORY },
  { date: '2026-05-28', name: "Id-ul-Zuha (Bakrid)", type: HolidayType.MANDATORY },
  { date: '2026-08-15', name: "Independence Day", type: HolidayType.MANDATORY },
  { date: '2026-08-26', name: "Onam", type: HolidayType.OPTIONAL },
  { date: '2026-08-28', name: "Raksha Bandhan", type: HolidayType.OPTIONAL },
  { date: '2026-09-04', name: "Janmashtami", type: HolidayType.OPTIONAL },
  { date: '2026-09-14', name: "Ganesh Chaturthi", type: HolidayType.OPTIONAL },
  { date: '2026-10-02', name: "Gandhi Jayanti", type: HolidayType.MANDATORY },
  { date: '2026-10-20', name: "Dussehra", type: HolidayType.MANDATORY },
  { date: '2026-11-09', name: "Diwali", type: HolidayType.MANDATORY },
  { date: '2026-12-25', name: "Christmas Day", type: HolidayType.MANDATORY },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];