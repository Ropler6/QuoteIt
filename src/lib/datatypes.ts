
export interface User_T {
    id: number;
    name: string;
    createdAt: Date;
    password: string;
}

export interface Quote_T {
    id: number;
    createdAt: Date;
    text: string;
}

export interface QuoteOwnership_T {
    id: number;
    userId: number;
    quoteId: number;
}