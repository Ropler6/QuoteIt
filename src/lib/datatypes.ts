
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
    quoteId: number;
    creatorId: number;
}

export interface Tag_T {
    id: number;
    hash: string;
    createdAt: Date;
    name: string;
    creatorId: number;
}

export interface TagMembership_T {
    id: number;
    tagId: number;
    userId: number;
}