
import { createClient } from '@supabase/supabase-js'
import type { Quote_T, QuoteOwnership_T, User_T } from '$lib/datatypes';
import dotenv from "dotenv"

dotenv.config();
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhY3F5cWVhdWhlZ21mbmRmYnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MDk4NTgsImV4cCI6MjAzNzM4NTg1OH0.SP8zioSTEvPQrAOlJdrwiCQSwl1RKmqGQuzZwpI1X8o"
const databaseKey = process.env.SUPABASE_KEY as string;
const supabaseURL = "https://tacqyqeauhegmfndfbvs.supabase.co"
const supabase = createClient(supabaseURL, databaseKey);

const _getUserByName = async (name: string) => {
    const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("name", name);

    if (error) return null;
    if (data === null || !data[0]) return null;
    return data[0] as User_T;
}

const _addQuote = async (text: string) => {
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

const _addQuoteOwnership = async (user: User_T, quote: Quote_T) => {
    const { data, error } = await supabase
        .from("QuoteOwnerships")
        .insert([
            { userId: user.id, quoteId: quote.id }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteOwnership_T;
}

const _getQuotesFromUser = async(user: User_T, limit: number = 50) => {
    const { data: quoteIds, error: error1 } = await supabase
        .from("QuoteOwnerships")
        .select("quoteId")
        .eq("userId", user.id);

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

export const register = async (name: string, password: string) => {
    const user = await _getUserByName(name);
    if (user !== null) return false;

    const { error } = await supabase
        .from("Users")
        .insert([{
            name,
            password,
            createdAt: new Date(),
        }])
        .select();

    if (error) return false;
    return true;
}

export const login = async (name: string, password: string) => {
    const user = await _getUserByName(name);
    if (user === null) return false;
    if (user.password === password) return true;
    return false;
}