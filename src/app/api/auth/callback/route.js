export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing code" }), { status: 400 });
  }

  // Intercambio del code por access_token
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

  // Crear la respuesta y guardar cookies seguras
  const response = new Response(null, { status: 302 }); // 302 redirect
  response.headers.set('Location', '/Dashboard');     // redirige a la página principal

  // Guardar access_token y refresh_token en cookies HttpOnly
  response.headers.append('Set-Cookie', `canvas_token=${tokenData.access_token}; HttpOnly; Path=/; SameSite=Lax`);
  response.headers.append('Set-Cookie', `canvas_refresh=${tokenData.refresh_token}; HttpOnly; Path=/; SameSite=Lax`);

  return response;
}

