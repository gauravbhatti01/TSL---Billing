export type BillStatus = 'Payment Received' | 'Submitted' | 'Pending';

export interface Bill {
    id: string;
    companyName: string;
    billNumber: string;
    date: string; // ISO Date string (Invoice Date)
    amount: number;
    status: BillStatus;
    createdDate: string; // ISO Date string
    updatedDate: string; // ISO Date string
    paymentReceivedDate?: string; // ISO Date string, optional
}
