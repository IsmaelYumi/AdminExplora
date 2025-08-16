// app/api/cursos/crear/route.js
import { NextResponse } from "next/server";

const CANVAS_BASE = process.env.CANVAS_BASE_URL; // ej: https://tuservidor.instructure.com
const CANVAS_TOKEN = process.env.CANVAS_TOKEN;   // tu token de API

export async function POST(req) {
  try {
    const body = await req.json();
    const { jornada, grados, paralelos, materias, profesor } = body;

    if (!grados || !paralelos || !profesor) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const cursosCreados = [];

    // Recorremos grados y paralelos
    for (const grado of grados) {
      const paralelosGrado = paralelos[grado] || [];

      for (const paralelo of paralelosGrado) {
        // Crear un nombre de curso
        const nombreCurso = `${grado} ${paralelo} - ${jornada}`;

        // POST a Canvas
        const res = await fetch(`${CANVAS_BASE}/api/v1/accounts/1/courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CANVAS_TOKEN}`,
          },
          body: JSON.stringify({
            course: {
              name: nombreCurso,
              // Aquí puedes agregar más campos como:
              // start_at, end_at, course_code, license, is_public, etc.
            },
          }),
        });

        const data = await res.json();
        cursosCreados.push({
          nombreCurso,
          idCanvas: data.id,
          profesor,
          materias,
        });

        // Aquí podrías asociar materias o profesor al curso usando otras APIs de Canvas
      }
    }

    return NextResponse.json(cursosCreados);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
