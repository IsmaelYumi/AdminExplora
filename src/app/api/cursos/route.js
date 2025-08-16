import { NextResponse } from "next/server";

// ⚠️ Mejor guardar esto en .env.local
const CANVAS_API_BASE = process.env.NEXT_PUBLIC_CANVAS_BASE_URL;
const CANVAS_API_KEY = process.env.CANVAS_API_KEY;   // tu token de Canvas
const DEFAULT_ACCOUNT_ID = process.env.CANVAS_ACCOUNT_ID || 1;

export async function POST(req) {
  try {
    const body = await req.json();

    const { jornada, grado, materias, paralelo, profesor } = body;

    // Nombre del curso generado
    const courseName = `${grado} ${paralelo} - ${jornada}`;

    // 📌 Payload que Canvas espera
    const payload = {
      course: {
        name: courseName,
        course_code: courseName,
        license: "private", // puede ser public_domain, cc_by, etc.
        is_public: false,
        default_view: "assignments", // o "modules"
      },
    };

    // Llamada a Canvas API
    const res = await fetch(
      `${CANVAS_API_BASE}/api/v1/accounts/${DEFAULT_ACCOUNT_ID}/courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CANVAS_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json(
        { error: "Error creando curso", details: error },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Opcional: asociar materias y profesor en tu BD local
    // o en Canvas usando más requests (ej: enrollments API)

    return NextResponse.json({
      id: data.id,
      name: data.name,
      sis_course_id: data.sis_course_id,
      materias,
      profesor,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error en el servidor", details: err.message },
      { status: 500 }
    );
  }
}


