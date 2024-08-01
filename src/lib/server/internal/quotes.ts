import { supabase } from "./supabase";
import type { Quote_T, User_T, QuoteOwnership_T } from "$lib/datatypes";

export const _addQuote = async (text: string) => {
    const { data, error } = await supabase
        .from("Quotes")
        .insert([
            { createdAt: new Date(), text }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as Quote_T;
}

export const _addQuoteOwnership = async (user: User_T, quote: Quote_T) => {
    const { data, error } = await supabase
        .from("QuoteOwnerships")
        .insert([
            { creatorId: user.id, quoteId: quote.id }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteOwnership_T;
}

export const _getQuotesFromUser = async(user: User_T, limit: number = 50) => {
    const { data: quoteIds, error: error1 } = await supabase
        .from("QuoteOwnerships")
        .select("quoteId")
        .eq("creatorId", user.id);

    if (error1) return null;
    if (quoteIds === null) return null;
    const ids: number[] = quoteIds.map(a => a.quoteId);

    let quotes: Quote_T[] = []

    for (const id of ids) {
        const { data, error } = await supabase
            .from("Quotes")
            .select("*")
            .eq("id", id);

        if (!error && data !== null)
            quotes.push({
                id: data[0].id,
                text: data[0].text,
                createdAt: new Date(data[0].createdAt),
            });
    }

    return quotes;
}