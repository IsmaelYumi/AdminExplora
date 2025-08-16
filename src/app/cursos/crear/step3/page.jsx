"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const materias = ["Matemáticas", "Lengua", "Ciencias", "Inglés"]; // ejemplo

export default function Step3() {
  const router = useRouter();
  const [selected, setSelected] = useState(new Set(materias));

  const toggle = (materia) => {
    const newSet = new Set(selected);
    newSet.has(materia) ? newSet.delete(materia) : newSet.add(materia);
    setSelected(newSet);
  };

  const handleNext = () => {
    localStorage.setItem("materias", JSON.stringify([...selected]));
    router.push("/cursos/crear/step4");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Seleccione materias</h1>
      <div className="flex flex-col gap-2">
        {materias.map((m) => (
          <label key={m} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selected.has(m)}
              onChange={() => toggle(m)}
            />
            {m}
          </label>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleNext}
      >
        Siguiente
      </button>
    </div>
  );
}
