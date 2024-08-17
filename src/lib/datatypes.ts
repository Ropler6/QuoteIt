
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
    createdAt: Date;
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
    createdAt: Date;
}

export interface IncomingFriendRequest_T {
    user: User_T,
    friendRequest: FriendRequest_T;
}

export interface Friendship_T {
    id: number;
    userId1: number;
    userId2: number;
}