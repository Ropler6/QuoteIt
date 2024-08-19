
export interface User_T {
    id: number;
    name: string;
    createdAt: string;
    password: string;
}

export interface Quote_T {
    id: number;
    createdAt: string;
    text: string;
    creatorId: number;
}

export interface QuoteMention_T {
    id: number;
    quoteId: number;
    userId: number;
}

export interface Tag_T {
    id: number;
    hash: string;
    createdAt: string;
    name: string;
    creatorId: number;
}

export interface TagMembership_T {
    id: number;
    tagId: number;
    userId: number;
}

export interface QuoteTag_T {
    id: number;
    quoteId: number;
    tagId: number;
}

export interface FriendRequest_T {
    id: number;
    senderId: number;
    receiverId: number;
    createdAt: string;
}

export interface IncomingFriendRequest_T extends FriendRequest_T {
    user: User_T,
}

export interface Friendship_T {
    id: number;
    userId1: number;
    userId2: number;
}