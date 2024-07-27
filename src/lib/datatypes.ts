
export interface User {
    id: number;
    name: string;
    createdAt: Date;
    password: string;
}

export interface Quote {
    id: number;
    createdAt: Date;
    text: string;
}

export interface QuoteOwnership {
    id: number;
    userId: number;
    quoteId: number;
}