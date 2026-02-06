import React, { useState, useEffect } from 'react';
import { Bill, BillStatus } from '@/types';
import { PlusCircle, Save, X } from 'lucide-react';

type BillFormData = Omit<Bill, 'id' | 'createdDate' | 'updatedDate' | 'paymentReceivedDate'>;

interface BillFormProps {
    onSubmit: (bill: BillFormData & Partial<Pick<Bill, 'id'>>) => void;
    initialData?: Bill;
    onCancel: () => void;
}

const PREDEFINED_COMPANIES = [
    "Bharat Forge Ltd",
    "B. G. Shirke",
    "Industrial Packers",
    "BTPL",
    "Adarsh Chemicals",
    "Bharat Forge Chakan"
];

export const BillForm: React.FC<BillFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState<BillFormData>({
        companyName: '',
        billNumber: '',
        date: '',
        amount: 0,
        status: 'Pending',
    });

    const [isOtherCompany, setIsOtherCompany] = useState(false);

    // Set initial date on client side only to avoid hydration mismatch
    useEffect(() => {
        if (!initialData && !formData.date) {
            setFormData(prev => ({
                ...prev,
                date: new Date().toISOString().split('T')[0]
            }));
        }
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                companyName: initialData.companyName,
                billNumber: initialData.billNumber,
                date: initialData.date,
                amount: initialData.amount,
                status: initialData.status,
            });

            const isPredefined = PREDEFINED_COMPANIES.includes(initialData.companyName);
            setIsOtherCompany(!isPredefined && !!initialData.companyName);
        } else {
            setIsOtherCompany(false);
        }
    }, [initialData]);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'Other') {
            setIsOtherCompany(true);
            setFormData({ ...formData, companyName: '' });
        } else if (value === '') {
            // Don't allow empty selection
            setIsOtherCompany(false);
            setFormData({ ...formData, companyName: '' });
        } else {
            setIsOtherCompany(false);
            setFormData({ ...formData, companyName: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted', formData);

        // Validate company name is not empty
        if (!formData.companyName || formData.companyName.trim() === '') {
            console.log('Validation failed: Company name is empty');
            alert('Please select or enter a company name');
            return;
        }

        console.log('Validation passed, submitting bill');
        if (initialData) {
            onSubmit({ ...formData, id: initialData.id });
        } else {
            onSubmit(formData);
        }
        if (!initialData) {
            setFormData({
                companyName: '',
                billNumber: '',
                date: new Date().toISOString().split('T')[0],
                amount: 0,
                status: 'Pending',
            });
            setIsOtherCompany(false);
        }
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60">
            <div className="flex justify-between items-center mb-4 md:mb-5">
                <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-tight">
                    {initialData ? 'Edit Bill' : 'Add New Bill'}
                </h3>
                {initialData && (
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 p-2 rounded-xl hover:bg-slate-200">
                        <X size={16} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">

                <div className="sm:col-span-2 lg:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 ml-1">Company Name</label>
                    <div className="grid gap-2">
                        <select
                            required
                            className="w-full rounded-xl border-slate-200 border p-2.5 md:p-2.5 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm bg-slate-50 hover:bg-white text-slate-700 text-sm"
                            value={
                                isOtherCompany
                                    ? 'Other'
                                    : (formData.companyName && PREDEFINED_COMPANIES.includes(formData.companyName))
                                        ? formData.companyName
                                        : ''
                            }
                            onChange={handleCompanyChange}
                        >
                            <option value="" disabled>Select Company</option>
                            {PREDEFINED_COMPANIES.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                            <option value="Other">Other (Add New)</option>
                        </select>

                        {isOtherCompany && (
                            <input
                                required
                                type="text"
                                className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm animate-fade-in-down text-sm"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                placeholder="Enter Company Name"
                                autoFocus
                            />
                        )}
                    </div>
                </div>

                <div className="sm:col-span-1 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 ml-1">Bill Number</label>
                    <input
                        required
                        type="text"
                        className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm placeholder-slate-400 text-sm"
                        value={formData.billNumber}
                        onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                        placeholder="#INV-001"
                    />
                </div>

                <div className="sm:col-span-1 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 ml-1">Date</label>
                    <input
                        required
                        type="date"
                        className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm text-slate-700 text-sm"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div className="sm:col-span-1 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 ml-1">Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500 font-sans font-medium text-sm">₹</span>
                        <input
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-xl border-slate-200 border p-2.5 pl-7 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm font-medium text-sm"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>

                <div className="sm:col-span-1 lg:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 ml-1">Status</label>
                    <select
                        className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm bg-white text-sm"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as BillStatus })}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Payment Received">Payment Received</option>
                    </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-6 flex justify-end mt-2 md:mt-3 pt-3 border-t border-slate-100">
                    {initialData ? (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 sm:flex-initial px-4 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 font-semibold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 sm:flex-initial px-4 py-2.5 text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 font-semibold text-sm"
                            >
                                <Save size={16} strokeWidth={2.5} /> Update
                            </button>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            onClick={() => console.log('Add Bill button clicked')}
                            className="w-full sm:w-auto px-5 py-3 min-h-[48px] text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-700 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 font-semibold text-sm touch-manipulation cursor-pointer"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <PlusCircle size={18} strokeWidth={2.5} /> Add Bill
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
