import { supabase } from "./supabase";
import type { Quote_T, User_T, QuoteMention_T } from "$lib/datatypes";

export const _addQuote = async (creatorId: number, text: string) => {
    const { data, error } = await supabase
        .from("Quotes")
        .insert([
            { createdAt: new Date(), text, creatorId }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as Quote_T;
}

export const _addQuoteMention = async (userId: number, quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .insert([
            { userId: userId, quoteId: quoteId }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteMention_T;
}

export const _getQuotesFromUser = async(userId: number, limit: number = 50) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .select("Quotes(*)")
        .eq("userId", userId);

    if (error) return null;
    
    const quotes: unknown[] = data.map(x => x.Quotes);
    for (let quote of (quotes as Quote_T[])) {
        quote.createdAt = new Date(quote.createdAt);
    }

    return quotes as Quote_T[];
}