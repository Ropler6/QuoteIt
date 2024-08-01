import { supabase } from "../internal/supabase";
import { _getUserByName } from "../internal/auth";

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