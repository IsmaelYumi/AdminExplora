"use client";
import { useState } from "react";

export default function CrearCurso() {
  // Datos de los steps
  const [jornada, setJornada] = useState("");
  const [grado, setGrado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [paralelo, setParalelo] = useState("");
  const [profesor, setProfesor] = useState("");

  const [resultado, setResultado] = useState(null);

  // Materias disponibles según grado (ejemplo)
  const materiasPorGrado = {
    "Inicial 1": ["Arte", "Música", "Matemáticas"],
    "Inicial 2": ["Arte", "Música", "Ciencias"],
    "1ro EGB": ["Matemáticas", "Lengua", "Historia"],
    "2do EGB": ["Matemáticas", "Lengua", "Ciencias"],
    "3ro EGB": ["Matemáticas", "Lengua", "Historia"],
  };

  // Paralelos disponibles
  const paralelos = ["A", "B", "C"];

  // Profesores (ejemplo)
  const profesoresDisponibles = ["Juan Pérez", "María Gómez", "Luis Torres"];

  const handleMateriaChange = (e) => {
    const value = e.target.value;
    setMaterias((prev) =>
      prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload para Canvas
    const payload = {
      name: `${grado} ${paralelo} - ${jornada}`,
      code: `${grado}${paralelo}`.replace(/\s+/g, ""),
      materias,
      profesor,
      default_view: "modules",
    };

    console.log("ENVIANDO A BACKEND:", payload);

    const res = await fetch("/api/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResultado(data);
  };

  return (
    <div>
      <h1>Crear curso en Canvas</h1>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Jornada */}
        <div>
          <label>Jornada:</label>
          <select value={jornada} onChange={(e) => setJornada(e.target.value)} required>
            <option value="">Selecciona jornada</option>
            <option value="Matutina">Matutina</option>
            <option value="Vespertina">Vespertina</option>
          </select>
        </div>

        {/* Step 2: Grado */}
        <div>
          <label>Grado:</label>
          <select value={grado} onChange={(e) => setGrado(e.target.value)} required>
            <option value="">Selecciona grado</option>
            {Object.keys(materiasPorGrado).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Step 3: Materias */}
        {grado && (
          <div>
            <label>Materias:</label>
            {materiasPorGrado[grado].map((m) => (
              <div key={m}>
                <input
                  type="checkbox"
                  value={m}
                  checked={materias.includes(m)}
                  onChange={handleMateriaChange}
                />{" "}
                {m}
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Paralelo */}
        <div>
          <label>Paralelo:</label>
          <select value={paralelo} onChange={(e) => setParalelo(e.target.value)} required>
            <option value="">Selecciona paralelo</option>
            {paralelos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Step 5: Profesor */}
        <div>
          <label>Profesor:</label>
          <select value={profesor} onChange={(e) => setProfesor(e.target.value)} required>
            <option value="">Selecciona profesor</option>
            {profesoresDisponibles.map((prof) => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>
        </div>

        <button type="submit">Crear curso</button>
      </form>

      {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
    </div>
  );
}
