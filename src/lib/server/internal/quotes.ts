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

export const _addQuoteMention = async (user: User_T, quote: Quote_T) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .insert([
            { userId: user.id, quoteId: quote.id }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteMention_T;
}

export const _getQuotesFromUser = async(user: User_T, limit: number = 50) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .select("Quotes(*)")
        .eq("userId", user.id);

    if (error) return null;
    
    const quotes = data.map(x => x.Quotes);
    for (let quote of quotes) {
        (quote as any).createdAt = new Date((quote as any).createdAt);
    }

    return quotes;
}