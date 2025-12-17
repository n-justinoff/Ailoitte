import { useState } from 'react';
import { MONTHS, HOLIDAYS, YEAR } from './constants';
import { HolidayType } from './types';
import MonthCard from './components/MonthCard';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import { List, Grid3X3, Download, AlertTriangle } from 'lucide-react';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [logoSrc, setLogoSrc] = useState("https://www.ailoitte.com/wp-content/uploads/2022/09/Ailoitte-Logo-1.svg");

  const totalMandatory = HOLIDAYS.filter(h => h.type === HolidayType.MANDATORY).length;
  const totalOptional = HOLIDAYS.filter(h => h.type === HolidayType.OPTIONAL).length;

  const handlePrint = () => {
    window.print();
  };

  const handleLogoUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setLogoSrc(objectUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <style>{`
        @media print {
          @page {
            margin: 0.5cm;
            size: portrait;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: white !important;
          }
          /* Ensure shadows and borders print nicely */
          * {
            box-shadow: none !important; 
          }
          /* Force colorful backgrounds */
          .bg-ailoitte-accent { 
            background-color: #2563eb !important; 
            color: white !important; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-blue-50 { 
            background-color: #eff6ff !important; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-amber-100 { 
            background-color: #fef3c7 !important; 
            color: #78350f !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-amber-50 { 
            background-color: #fffbeb !important; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-blue-100 { 
            background-color: #dbeafe !important; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
      
      {/* =========================================
          WEB VIEW (Hidden on Print)
          ========================================= */}
      <div className="print:hidden flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo 
                className="scale-90 origin-left sm:scale-100" 
                src={logoSrc}
                onUpload={handleLogoUpload}
              />
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
        <section className="bg-white border-b border-slate-100 pt-8 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-ailoitte-accent font-bold uppercase tracking-wider text-xs mb-1">Year {YEAR}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Company Holidays</h2>
                <p className="text-slate-500 max-w-xl">
                  Plan your year ahead with the official holiday schedule.
                </p>
                <p className="text-xs text-slate-400 mt-2 italic">
                  Tip: Click the logo in the header to upload your local company logo before printing.
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

            {/* Note about Optional Leave */}
            <div className="mt-8 flex justify-center md:justify-start">
               <div className="relative overflow-hidden bg-white border-l-4 border-amber-500 shadow-sm rounded-r-lg p-4 flex items-center gap-4 max-w-2xl w-full ring-1 ring-slate-100">
                  <div className="bg-amber-100 p-2.5 rounded-full text-amber-600 shrink-0">
                    <AlertTriangle size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-0.5">Note</p>
                    <p className="text-slate-700 text-sm font-medium">
                      You may avail only <span className="font-bold text-slate-900 border-b-2 border-amber-300">ONE Optional Leave</span> during the year.
                    </p>
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

        </main>

        <Footer />
      </div>

      {/* =========================================
          PRINT VIEW (Visible only on Print)
          ========================================= */}
      <div className="hidden print:block w-full h-full bg-white">
        
        {/* PAGE 1: 12 Months Grid */}
        <div className="h-screen flex flex-col" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
          {/* Print Header */}
          <div className="flex justify-between items-center mb-1 border-b pb-2 px-2 pt-2">
             <div className="flex items-center gap-4">
               {/* Use the dynamically uploaded logo */}
               <img src={logoSrc} alt="Logo" className="h-10 w-auto object-contain" />
               <div className="w-px h-6 bg-slate-200"></div>
               <div>
                  <h1 className="text-xl font-bold text-slate-800 leading-tight">Holiday Calendar {YEAR}</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Official Schedule</p>
               </div>
             </div>
             <div className="text-right">
               <div className="flex gap-4 text-xs">
                 <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ailoitte-accent"></span> {totalMandatory} Mandatory</span>
                 <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> {totalOptional} Optional</span>
               </div>
             </div>
          </div>

          {/* Highlighted Note for Print */}
          <div className="mx-2 mb-2 mt-2 py-2 border-y-2 border-slate-900 bg-slate-50 text-center">
             <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center justify-center gap-2">
               <span className="bg-slate-900 text-white px-1.5 py-px rounded-sm">IMPORTANT</span>
               You may avail only ONE Optional Leave during the year
             </p>
          </div>

          {/* Grid Layout for Print (3 cols x 4 rows = 12 months) */}
          {/* Scaling content to fit page perfectly */}
          <div className="flex-grow flex items-start justify-center overflow-hidden">
             <div className="grid grid-cols-3 gap-3 w-full" style={{ transform: 'scale(0.85)', transformOrigin: 'top center', width: '117%' }}>
                {MONTHS.map((monthName, index) => (
                    <div key={`print-${monthName}`} className="break-inside-avoid">
                      <MonthCard 
                        monthName={monthName} 
                        monthIndex={index} 
                      />
                    </div>
                ))}
             </div>
          </div>
          
          <div className="mt-auto py-2 px-2 text-[10px] text-slate-400 flex justify-between border-t">
            <span></span>
            <span>Page 1 of 2</span>
          </div>
        </div>

        {/* PAGE 2: Holiday List */}
        <div className="h-screen flex flex-col pt-6 px-4">
           <div className="flex justify-between items-center mb-6 border-b pb-4">
             <div className="flex items-center gap-4">
               {/* Logo removed here */}
               <h2 className="text-lg font-bold text-slate-800">Holiday List Details</h2>
             </div>
             <div className="text-xs text-slate-400 uppercase">Year {YEAR}</div>
           </div>

           <div className="border rounded-lg overflow-hidden">
             <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 uppercase text-slate-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Day</th>
                    <th className="px-4 py-3 w-1/2">Holiday Name</th>
                    <th className="px-4 py-3 text-right">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {HOLIDAYS.map((holiday, idx) => {
                    const d = new Date(holiday.date);
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
                    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const isMandatory = holiday.type === HolidayType.MANDATORY;

                    return (
                      <tr key={idx} className="break-inside-avoid">
                        <td className="px-4 py-3 font-medium text-slate-900">{formattedDate}</td>
                        <td className="px-4 py-3 text-slate-500">{dayName}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{holiday.name}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border
                            ${isMandatory 
                              ? 'bg-blue-50 border-blue-100 text-blue-800' 
                              : 'bg-amber-50 border-amber-100 text-amber-800'
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

           <div className="mt-auto py-4 text-[10px] text-slate-400 flex justify-between border-t">
            <span></span>
            <span>Page 2 of 2</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;