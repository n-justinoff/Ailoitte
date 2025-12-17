export enum HolidayType {
  MANDATORY = 'Mandatory',
  OPTIONAL = 'Optional'
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: HolidayType;
}

export interface MonthData {
  name: string;
  index: number; // 0-11
  year: number;
}