"use client";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();

  const handleSelect = (jornada) => {
    localStorage.setItem("jornada", jornada);
    router.push("/cursos/crear/step2");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Escoja la jornada</h1>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => handleSelect("Matutina")}
        >
          Matutina
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => handleSelect("Vespertina")}
        >
          Vespertina
        </button>
      </div>
    </div>
  );
}
