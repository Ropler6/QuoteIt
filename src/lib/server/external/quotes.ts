import { supabase } from "../internal/supabase";
import { _getUserByName } from "../internal/utils";
import { _getQuotesFromUser, _addQuote, _addQuoteMention } from "../internal/quotes";

export const getQuotesFromUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    return {
        quotes: await _getQuotesFromUser(user.id),
        user
    }
}

export const addSingleQuote = async (_user: string, text: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const quote = await _addQuote(user.id, text);
    if (quote === null) return null;

    const mention = await _addQuoteMention(user.id, quote.id);
    if (mention === null) return null;

    return { quote, mention };
}

export const removeSingleQuote = async (quoteId: number) => {
    const quotesResponse = await supabase
        .from("Quotes")
        .delete()
        .eq("id", quoteId);

    const ownershipResponse = await supabase
        .from("QuoteMentions")
        .delete()
        .eq("quoteId", quoteId);

    if (quotesResponse.error || ownershipResponse.error) return false;
    return true;
}

