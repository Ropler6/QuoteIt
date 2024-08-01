import { supabase } from "../internal/supabase";
import { _getUserByName } from "../internal/auth";
import { _getQuotesFromUser, _addQuote, _addQuoteOwnership } from "../internal/quotes";

export const getQuotesFromUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    return {
        quotes: await _getQuotesFromUser(user),
        user
    }
}

export const addSingleQuote = async (user: string, text: string) => {
    const username = await _getUserByName(user);
    if (username === null) return null;

    const quote = await _addQuote(text);
    if (quote === null) return null;

    const ownership = await _addQuoteOwnership(username, quote);
    if (ownership === null) return null;

    return { quote, ownership };
}

export const removeSingleQuote = async (quoteId: number) => {
    const quotesResponse = await supabase
        .from("Quotes")
        .delete()
        .eq("id", quoteId);

    const ownershipResponse = await supabase
        .from("QuoteOwnerships")
        .delete()
        .eq("quoteId", quoteId);

    if (quotesResponse.error || ownershipResponse.error) return false;
    return true;
}

