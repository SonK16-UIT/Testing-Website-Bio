import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iwcsdzlfhokacefmdzvc.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Y3NkemxmaG9rYWNlZm1kenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDU3NTksImV4cCI6MjEwMzMyMTc1OX0.xfhi3K5DcIMe6AZ8wm2a9PoUgbFVC-RfdNehQ0KVqQg';

    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error_description || data.msg || 'Authentication failed' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server proxy failed' }, { status: 500 });
  }
}
