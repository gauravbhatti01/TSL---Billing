import { useState, useEffect } from 'react';
import { Bill } from '@/types';

const STORAGE_KEY = 'bill-management-data';

export const useBills = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            try {
                setBills(JSON.parse(storedData));
            } catch (error) {
                console.error('Failed to parse bill data', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever bills change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bills));
        }
    }, [bills, isLoaded]);

    const addBill = (newBillData: Omit<Bill, 'id' | 'createdDate' | 'updatedDate'>) => {
        const now = new Date().toISOString();
        const bill: Bill = {
            ...newBillData,
            id: crypto.randomUUID(),
            createdDate: now,
            updatedDate: now,
            paymentReceivedDate: newBillData.status === 'Payment Received' ? now : undefined,
        };
        setBills((prev) => [...prev, bill]);
    };

    const editBill = (updatedBillData: Bill) => {
        const now = new Date().toISOString();
        setBills((prev) =>
            prev.map((bill) => {
                if (bill.id === updatedBillData.id) {

                    let paymentReceivedDate = bill.paymentReceivedDate;

                    // If changing TO Payment Received from something else, set the date
                    if (updatedBillData.status === 'Payment Received' && bill.status !== 'Payment Received') {
                        paymentReceivedDate = now;
                    }
                    // If changing FROM Payment Received to something else, clear the date
                    else if (updatedBillData.status !== 'Payment Received' && bill.status === 'Payment Received') {
                        paymentReceivedDate = undefined;
                    }

                    return {
                        ...updatedBillData,
                        updatedDate: now,
                        paymentReceivedDate,
                        // Ensure createdDate persists if not passed (though it should be in updatedBillData)
                        createdDate: bill.createdDate || now
                    };
                }
                return bill;
            })
        );
    };

    const deleteBill = (id: string) => {
        setBills((prev) => prev.filter((bill) => bill.id !== id));
    };

    const clearAllBills = () => {
        if (confirm('Are you sure you want to delete all records? This action cannot be undone.')) {
            setBills([]);
        }
    };

    return {
        bills,
        addBill,
        editBill,
        deleteBill,
        clearAllBills,
        isLoaded,
    };
};
