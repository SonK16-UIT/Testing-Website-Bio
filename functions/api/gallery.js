export async function onRequestGet(context) {
  const env = context.env;
  const supabaseUrl = env.SUPABASE_URL || 'https://iwcsdzlfhokacefmdzvc.supabase.co';
  const supabaseKey = env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Y3NkemxmaG9rYWNlZm1kenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDU3NTksImV4cCI6MjEwMzMyMTc1OX0.xfhi3K5DcIMe6AZ8wm2a9PoUgbFVC-RfdNehQ0KVqQg';

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/promo_gallery?select=*&order=position.asc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
