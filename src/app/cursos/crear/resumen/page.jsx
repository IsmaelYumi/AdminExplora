"use client";

import { useState, useEffect } from "react";

export default function Resumen() {
  const [data, setData] = useState({
    jornada: "",
    grados: [],
    materias: [],
    paralelos: {},
    profesor: "",
  });
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Cargar todo de localStorage
    const jornada = localStorage.getItem("jornada") || "";
    const grados = JSON.parse(localStorage.getItem("grados") || "[]");
    const materias = JSON.parse(localStorage.getItem("materias") || "[]");
    const paralelos = JSON.parse(localStorage.getItem("paralelos") || "{}");
    const profesor = localStorage.getItem("profesor") || "";

    setData({ jornada, grados, materias, paralelos, profesor });
  }, []);

 const handleCrearCursos = async () => {
  const jornada = localStorage.getItem("jornada");
  const grados = JSON.parse(localStorage.getItem("grados") || "[]");
  const paralelos = JSON.parse(localStorage.getItem("paralelos") || "{}");
  const materias = JSON.parse(localStorage.getItem("materias") || "[]");
  const profesor = localStorage.getItem("profesor");

  try {
    const res = await fetch("/api/cursos/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jornada, grados, paralelos, materias, profesor }),
    });

    const data = await res.json();
    console.log("Cursos creados:", data);
    alert("Cursos creados correctamente!");
  } catch (err) {
    console.error("Error en la respuesta:", err);
    alert("Error al crear cursos");
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumen</h1>

      <div className="mb-4">
        <p><strong>Jornada:</strong> {data.jornada}</p>
        <p><strong>Grados:</strong> {data.grados.join(", ")}</p>
        <p><strong>Materias:</strong> {data.materias.join(", ")}</p>
        <p>
          <strong>Paralelos:</strong>{" "}
          {Object.entries(data.paralelos)
            .map(([grado, par]) => `${grado}: ${par.join(", ")}`)
            .join(" | ")}
        </p>
        <p><strong>Profesor:</strong> {data.profesor}</p>
      </div>

      <button
        onClick={handleCrearCursos}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Creando cursos..." : "Crear Cursos en Canvas"}
      </button>

      {resultados.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Cursos creados:</h2>
          <ul className="list-disc pl-5">
            {resultados.map((curso, idx) => (
              <li key={idx}>
                {curso.name} (ID Canvas: {curso.id}) - Profesor: {curso.profesor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
