export default function Login() {
  const loginUrl = `${process.env.NEXT_PUBLIC_CANVAS_BASE_URL}/login/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_CANVAS_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_CANVAS_REDIRECT_URI}`;

  return (
    <div>
      <h1>Login con Canvas</h1>
      <a href={loginUrl}>Iniciar sesión</a>
    </div>
  );
}
