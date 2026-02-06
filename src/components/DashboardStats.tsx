import React, { useMemo } from 'react';
import { Bill } from '@/types';
import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface DashboardStatsProps {
    bills: Bill[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ bills }) => {
    const stats = useMemo(() => {
        return bills.reduce(
            (acc, bill) => {
                const amount = Number(bill.amount);
                acc.total += amount;
                if (bill.status === 'Payment Received') {
                    acc.paid += amount;
                } else {
                    acc.pending += amount;
                }
                return acc;
            },
            { total: 0, paid: 0, pending: 0 }
        );
    }, [bills]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 md:p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="p-2 md:p-2.5 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-all duration-300">
                        <TrendingUp size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Outstanding</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(stats.total)}</p>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-4 md:p-6 border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="p-2 md:p-2.5 bg-emerald-100 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <CheckCircle size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">Amount Received</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(stats.paid)}</p>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-white rounded-2xl p-4 md:p-6 border border-amber-100 hover:border-amber-200 transition-all duration-300 hover:shadow-lg hover:shadow-amber-200/50">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="p-2 md:p-2.5 bg-amber-100 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                        <Clock size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">Pending Amount</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(stats.pending)}</p>
            </div>
        </div>
    );
};
