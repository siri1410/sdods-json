export interface Transaction {
    date: string;
    type: string;
}

export interface Data {
    name: string;
    amount: number;
    transactions: Transaction[];
}

export const initialData: Data[] = [
    { name: 'Sireesh', amount: 100, transactions: [{ date: '2024-01-01', type: 'purchase' }] },
    { name: 'Siri1410', amount: 200, transactions: [{ date: '2027-02-15', type: 'deposit' }] },
];