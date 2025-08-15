export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing code" }), { status: 400 });
  }

  const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_CANVAS_BASE_URL}/login/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_CANVAS_CLIENT_ID,
      client_secret: process.env.CANVAS_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_CANVAS_REDIRECT_URI,
      code
    })
  });

  const tokenData = await tokenResponse.json();

  // Aquí podrías guardar el token en una cookie segura
  return new Response(JSON.stringify(tokenData), { status: 200 });
}
