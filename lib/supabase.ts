import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iwcsdzlfhokacefmdzvc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Y3NkemxmaG9rYWNlZm1kenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDU3NTksImV4cCI6MjEwMzMyMTc1OX0.xfhi3K5DcIMe6AZ8wm2a9PoUgbFVC-RfdNehQ0KVqQg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
