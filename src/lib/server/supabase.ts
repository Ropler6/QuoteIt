import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv"

dotenv.config();
const databaseKey = process.env.SUPABASE_KEY as string;
const supabaseURL = "https://tacqyqeauhegmfndfbvs.supabase.co"
export const supabase = createClient(supabaseURL, databaseKey);
