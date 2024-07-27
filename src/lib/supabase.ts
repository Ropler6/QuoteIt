
import { createClient } from '@supabase/supabase-js'
import type { Quote, QuoteOwnership, User } from '$lib/datatypes';
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
    if (data === null) return null;
    return data[0] as User;
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
    return data[0] as Quote;
}

const _addQuoteOwnership = async (user: User, quote: Quote) => {
    const { data, error } = await supabase
        .from("Quote_Ownership")
        .insert([
            { userId: user.id, quoteId: quote.id }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteOwnership;
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

export const login = async (name: string, password: string) => {
    const user = await _getUserByName(name);
    if (user === null) return false;
    if (user.password === password) return true;
    return false;
}