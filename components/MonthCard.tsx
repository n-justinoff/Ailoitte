import React from 'react';
import { HOLIDAYS, DAYS_OF_WEEK, YEAR } from '../constants';
import { Holiday, HolidayType } from '../types';

interface MonthCardProps {
  monthIndex: number;
  monthName: string;
}

const MonthCard: React.FC<MonthCardProps> = ({ monthIndex, monthName }) => {
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(monthIndex, YEAR);
  const firstDay = getFirstDayOfMonth(monthIndex, YEAR);
  
  // Create array of empty slots for padding before the 1st of the month
  const blanks = Array(firstDay).fill(null);
  
  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter holidays for this month
  const monthHolidays = HOLIDAYS.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() === monthIndex && d.getFullYear() === YEAR;
  });

  const getHolidayForDay = (day: number): Holiday | undefined => {
    const dateString = `${YEAR}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return monthHolidays.find(h => h.date === dateString);
  };

  const isWeekend = (dayIndex: number) => {
    // 0 is Sunday, 6 is Saturday
    return dayIndex % 7 === 0 || dayIndex % 7 === 6;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-lg">{monthName}</h3>
        {monthHolidays.length > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            {monthHolidays.length} Holiday{monthHolidays.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-[10px] uppercase font-bold text-slate-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-sm">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="aspect-square"></div>
          ))}
          
          {days.map((day, i) => {
            const holiday = getHolidayForDay(day);
            const absoluteDayIndex = i + firstDay;
            const weekend = isWeekend(absoluteDayIndex);
            
            let bgClass = "hover:bg-slate-50";
            let textClass = weekend ? "text-slate-400" : "text-slate-700";
            let borderClass = "border border-transparent";
            
            if (holiday) {
              if (holiday.type === HolidayType.MANDATORY) {
                bgClass = "bg-ailoitte-accent text-white shadow-sm hover:bg-blue-700";
                textClass = "text-white font-semibold";
              } else {
                bgClass = "bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200";
                textClass = "text-amber-900 font-medium";
                borderClass = "border border-amber-200";
              }
            } else if (new Date().toDateString() === new Date(YEAR, monthIndex, day).toDateString()) {
               // Current day logic
            }

            return (
              <div 
                key={day} 
                className={`
                  aspect-square flex items-center justify-center rounded-lg cursor-default relative group
                  ${bgClass} ${textClass} ${borderClass} transition-colors
                `}
              >
                {day}
                {holiday && (
                   <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] bg-slate-800 text-white text-xs rounded py-1 px-2 pointer-events-none z-10 shadow-lg text-center print:hidden">
                     {holiday.name}
                     <div className="text-[10px] opacity-75 uppercase mt-0.5">{holiday.type}</div>
                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini List for the month - Hidden in print */}
      <div className="px-4 pb-4 pt-0 print:hidden">
        <div className="space-y-1.5 min-h-[40px]">
          {monthHolidays.map((h, idx) => (
            <div key={idx} className="flex items-start text-xs gap-2">
              <div className={`mt-1 min-w-[6px] h-[6px] rounded-full ${h.type === HolidayType.MANDATORY ? 'bg-ailoitte-accent' : 'bg-amber-400'}`}></div>
              <div className="leading-tight">
                <span className="font-semibold text-slate-700">
                  {new Date(h.date).getDate()}
                </span>
                <span className="text-slate-500 mx-1">-</span>
                <span className="text-slate-600">{h.name}</span>
              </div>
            </div>
          ))}
          {monthHolidays.length === 0 && (
             <p className="text-xs text-slate-300 italic text-center py-2">No holidays this month</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthCard;