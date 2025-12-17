import { useState } from 'react';
import { MONTHS, HOLIDAYS, YEAR } from './constants';
import { HolidayType } from './types';
import MonthCard from './components/MonthCard';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import { List, Grid3X3, Download } from 'lucide-react';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const totalMandatory = HOLIDAYS.filter(h => h.type === HolidayType.MANDATORY).length;
  const totalOptional = HOLIDAYS.filter(h => h.type === HolidayType.OPTIONAL).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-slate-100 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="scale-90 origin-left sm:scale-100" />
            <div className="hidden md:block w-px h-8 bg-slate-200 mx-2"></div>
            <h1 className="hidden md:block text-slate-500 font-medium text-sm tracking-wide uppercase">
              Holiday Calendar {YEAR}
            </h1>
          </div>

          <div className="flex items-center gap-3">
             <button 
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex items-center gap-2"
              title="Print Calendar"
            >
              <Download size={18} />
              <span className="text-xs font-medium">Print</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                title="Grid View"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Summary Section */}
      <section className="bg-white border-b border-slate-100 pt-8 pb-10 print:pt-4 print:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-ailoitte-accent font-bold uppercase tracking-wider text-xs mb-1">Year {YEAR}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Company Holidays</h2>
              <p className="text-slate-500 max-w-xl">
                Plan your year ahead with the official Ailoitte holiday schedule.
              </p>
            </div>
            
            <div className="flex gap-4 flex-wrap">
               <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 px-4 flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-ailoitte-accent"></div>
                 <div className="flex flex-col">
                   <span className="text-xl font-bold text-slate-900 leading-none">{totalMandatory}</span>
                   <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide">Mandatory</span>
                 </div>
               </div>

               <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 px-4 flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="flex flex-col">
                   <span className="text-xl font-bold text-slate-900 leading-none">{totalOptional}</span>
                   <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">Optional</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* View: GRID */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MONTHS.map((monthName, index) => (
              <MonthCard 
                key={monthName} 
                monthName={monthName} 
                monthIndex={index} 
              />
            ))}
          </div>
        )}

        {/* View: LIST */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Day</th>
                    <th className="px-6 py-4 w-1/2">Holiday Name</th>
                    <th className="px-6 py-4 text-right">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {HOLIDAYS.map((holiday, idx) => {
                    const d = new Date(holiday.date);
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
                    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const isMandatory = holiday.type === HolidayType.MANDATORY;

                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{formattedDate}</td>
                        <td className="px-6 py-4 text-slate-500">{dayName}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{holiday.name}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${isMandatory 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                            }`}>
                            {holiday.type}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Print Only View (Simplified) */}
        <div className="hidden print:block mt-8">
           <div className="grid grid-cols-3 gap-4">
             {MONTHS.map((monthName, index) => (
                <div key={`print-${monthName}`} className="scale-90 origin-top-left mb-4 break-inside-avoid">
                  <MonthCard 
                    monthName={monthName} 
                    monthIndex={index} 
                  />
                </div>
              ))}
           </div>
           <div className="mt-8 text-center text-xs text-slate-400 border-t pt-4">
             Generated for Ailoitte - 2026
           </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;