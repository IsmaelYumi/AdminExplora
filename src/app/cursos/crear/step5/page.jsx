"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const profesores = ["Juan Pérez", "Ana Gómez"]; // de Canvas API en real

export default function Step5() {
  const router = useRouter();
  const [profesor, setProfesor] = useState(profesores[0]);

  const handleNext = () => {
    localStorage.setItem("profesor", profesor);
    router.push("/cursos/crear/resumen");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Seleccione el profesor</h1>
      <select
        value={profesor}
        onChange={(e) => setProfesor(e.target.value)}
        className="border rounded p-2"
      >
        {profesores.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleNext}
      >
        Siguiente
      </button>
    </div>
  );
}
