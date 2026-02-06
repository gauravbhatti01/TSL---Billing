import React from 'react';
import { Calendar, ChevronDown, Sparkles } from 'lucide-react';

export type DateFilterType = 'month' | 'year' | 'custom';

interface DateFilterProps {
    filterType: DateFilterType;
    onFilterTypeChange: (type: DateFilterType) => void;
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    selectedYear: string;
    onYearChange: (year: string) => void;
    dateRange: { start: string; end: string };
    onDateRangeChange: (range: { start: string; end: string }) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
    filterType,
    onFilterTypeChange,
    selectedMonth,
    onMonthChange,
    selectedYear,
    onYearChange,
    dateRange,
    onDateRangeChange,
}) => {
    // Generate years (from current year to 2050)
    const currentYear = new Date().getFullYear();
    const yearCount = 2050 - currentYear + 1;
    const years = Array.from({ length: yearCount }, (_, i) => currentYear + i);

    const months = [
        { value: '01', label: 'January', short: 'Jan' },
        { value: '02', label: 'February', short: 'Feb' },
        { value: '03', label: 'March', short: 'Mar' },
        { value: '04', label: 'April', short: 'Apr' },
        { value: '05', label: 'May', short: 'May' },
        { value: '06', label: 'June', short: 'Jun' },
        { value: '07', label: 'July', short: 'Jul' },
        { value: '08', label: 'August', short: 'Aug' },
        { value: '09', label: 'September', short: 'Sep' },
        { value: '10', label: 'October', short: 'Oct' },
        { value: '11', label: 'November', short: 'Nov' },
        { value: '12', label: 'December', short: 'Dec' },
    ];

    return (
        <div className="space-y-2.5">
            {/* Filter Type Selector with Gradient */}
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                    <div className="p-0.5 bg-gradient-to-br from-violet-500 to-indigo-500 rounded">
                        <Calendar size={11} strokeWidth={2.5} className="text-white" />
                    </div>
                    Date Filter
                </label>
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 p-1 rounded-xl border border-slate-200/60 shadow-sm">
                    <div className="grid grid-cols-3 gap-1">
                        <button
                            onClick={() => onFilterTypeChange('month')}
                            className={`relative px-3 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 overflow-hidden group ${filterType === 'month'
                                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                                : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
                                }`}
                        >
                            {filterType === 'month' && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-1">
                                <Sparkles size={12} strokeWidth={2.5} className={filterType === 'month' ? 'animate-pulse' : 'hidden'} />
                                Month
                            </span>
                        </button>
                        <button
                            onClick={() => onFilterTypeChange('year')}
                            className={`relative px-3 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 overflow-hidden group ${filterType === 'year'
                                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                                : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
                                }`}
                        >
                            {filterType === 'year' && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-1">
                                <Sparkles size={12} strokeWidth={2.5} className={filterType === 'year' ? 'animate-pulse' : 'hidden'} />
                                Year
                            </span>
                        </button>
                        <button
                            onClick={() => onFilterTypeChange('custom')}
                            className={`relative px-3 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 overflow-hidden group ${filterType === 'custom'
                                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                                : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
                                }`}
                        >
                            {filterType === 'custom' && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-1">
                                <Sparkles size={12} strokeWidth={2.5} className={filterType === 'custom' ? 'animate-pulse' : 'hidden'} />
                                Custom
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Month Picker with Enhanced Design */}
            {filterType === 'month' && (
                <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 rounded-xl p-3 border border-violet-100 shadow-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-violet-600 uppercase tracking-wider ml-1 flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-violet-500 animate-pulse" />
                                    Month
                                </label>
                                <div className="relative group">
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => onMonthChange(e.target.value)}
                                        className="w-full text-sm font-semibold rounded-lg border-violet-200 border-2 p-2.5 pr-8 bg-white hover:bg-violet-50/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none cursor-pointer text-slate-700"
                                    >
                                        <option value="">Select Month</option>
                                        {months.map((month) => (
                                            <option key={month.value} value={month.value}>
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={2.5}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-violet-500 pointer-events-none group-hover:text-violet-600 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider ml-1 flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                                    Year
                                </label>
                                <div className="relative group">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => onYearChange(e.target.value)}
                                        className="w-full text-sm font-semibold rounded-lg border-indigo-200 border-2 p-2.5 pr-8 bg-white hover:bg-indigo-50/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer text-slate-700"
                                    >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year.toString()}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={2.5}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none group-hover:text-indigo-600 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Year Picker with Enhanced Design */}
            {filterType === 'year' && (
                <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-xl p-3 border border-indigo-100 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                                Select Year
                            </label>
                            <div className="relative group">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => onYearChange(e.target.value)}
                                    className="w-full text-sm font-semibold rounded-lg border-indigo-200 border-2 p-2.5 pr-8 bg-white hover:bg-indigo-50/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer text-slate-700"
                                >
                                    <option value="">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year.toString()}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={16}
                                    strokeWidth={2.5}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none group-hover:text-indigo-600 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Date Range with Enhanced Design */}
            {filterType === 'custom' && (
                <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-xl p-3 border border-slate-200 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
                                Date Range
                            </label>
                            <div className="flex gap-2 items-center">
                                <div className="relative flex-1 group">
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) =>
                                            onDateRangeChange({ ...dateRange, start: e.target.value })
                                        }
                                        className="w-full text-sm font-medium rounded-lg border-slate-200 border-2 p-2.5 bg-white hover:bg-slate-50/50 focus:bg-white transition-all duration-300 text-slate-700 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200">
                                    <span className="text-slate-400 text-sm font-bold">→</span>
                                </div>
                                <div className="relative flex-1 group">
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) =>
                                            onDateRangeChange({ ...dateRange, end: e.target.value })
                                        }
                                        className="w-full text-sm font-medium rounded-lg border-slate-200 border-2 p-2.5 bg-white hover:bg-slate-50/50 focus:bg-white transition-all duration-300 text-slate-700 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
