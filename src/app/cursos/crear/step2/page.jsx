"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GradosStep() {
  const router = useRouter();
  const grados = ["Inicial 1", "Inicial 2", "1ro. EGB", "2do. EGB", "3ro. EGB"];
  const [selected, setSelected] = useState([]);

  const toggleGrado = (grado) => {
    setSelected((prev) =>
      prev.includes(grado) ? prev.filter((g) => g !== grado) : [...prev, grado]
    );
  };

  const handleNext = () => {
    console.log("Grados seleccionados:", selected);
    localStorage.setItem("grados", JSON.stringify(selected));
    router.push("/cursos/crear/step3"); // Step 3
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paso 2: Selecciona los grados</h1>

      <div className="grid grid-cols-2 gap-4">
        {grados.map((grado) => (
          <button
            key={grado}
            type="button"
            onClick={() => toggleGrado(grado)}
            className={`p-4 rounded-lg border text-lg font-medium ${
              selected.includes(grado)
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            {grado}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={selected.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
