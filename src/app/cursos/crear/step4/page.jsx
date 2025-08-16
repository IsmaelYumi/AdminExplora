"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ParalelosStep() {
  const router = useRouter();
  const [grados, setGrados] = useState([]);
  const [paralelos, setParalelos] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("grados");
    if (stored) {
      setGrados(JSON.parse(stored));
    }
  }, []);

  const toggleParalelo = (grado, paralelo) => {
    setParalelos((prev) => {
      const actuales = prev[grado] || [];
      return {
        ...prev,
        [grado]: actuales.includes(paralelo)
          ? actuales.filter((p) => p !== paralelo)
          : [...actuales, paralelo],
      };
    });
  };

  const handleNext = () => {
    console.log("Paralelos seleccionados:", paralelos);
    localStorage.setItem("paralelos", JSON.stringify(paralelos));
    router.push("/cursos/crear/step5"); // siguiente paso
  };

  const opcionesParalelos = ["A", "B", "C"];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paso 4: Selecciona los paralelos</h1>

      {grados.length === 0 ? (
        <p className="text-gray-600">⚠️ No se seleccionaron grados en el paso 2.</p>
      ) : (
        <div className="space-y-6">
          {grados.map((grado) => (
            <div key={grado}>
              <h2 className="text-lg font-semibold mb-2">{grado}</h2>
              <div className="flex gap-4">
                {opcionesParalelos.map((paralelo) => (
                  <button
                    key={paralelo}
                    type="button"
                    onClick={() => toggleParalelo(grado, paralelo)}
                    className={`px-4 py-2 rounded-lg border ${
                      paralelos[grado]?.includes(paralelo)
                        ? "bg-green-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {paralelo}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={Object.keys(paralelos).length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
