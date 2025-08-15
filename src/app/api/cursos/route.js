import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name, code } = body;
  const canvasBaseUrl = process.env.NEXT_PUBLIC_CANVAS_BASE_URL;
  const accountId = 1;

  const accessToken = req.cookies.get("canvas_token")?.value;
  if (!accessToken) return NextResponse.json({ error: "No access token" }, { status: 401 });

  const res = await fetch(`${canvasBaseUrl}/api/v1/accounts/${accountId}/courses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ course: { name, course_code: code, is_public: false, license: "private" } })
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
