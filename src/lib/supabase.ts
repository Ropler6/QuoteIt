
import { createClient } from '@supabase/supabase-js'
import type { User } from '$lib/datatypes';
import dotenv from "dotenv"

dotenv.config();
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhY3F5cWVhdWhlZ21mbmRmYnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MDk4NTgsImV4cCI6MjAzNzM4NTg1OH0.SP8zioSTEvPQrAOlJdrwiCQSwl1RKmqGQuzZwpI1X8o"
const databaseKey = process.env.SUPABASE_KEY as string;
const supabaseURL = "https://tacqyqeauhegmfndfbvs.supabase.co"
const supabase = createClient(supabaseURL, databaseKey);

const getUserByName = async (name: string) => {
    let { data, error } = await supabase
        .from("Users")
        .select("created_at,name,password")
        .eq("name", name);

    if (error) return {} as User;
    if (data === null) return {} as User;
    return data[0] as User;
}

export const login = async (name: string, password: string) => {
    const user = await getUserByName(name);
    if (user === undefined || user === null) return false;
    if (user.password === password) return true;
    return false;
}