"use client";
import { useState } from "react";

export default function CrearCurso() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code })
    });
    const data = await res.json();
    setResultado(data);
  };

  return (
    <div>
      <h1>Crear curso en Canvas</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código" required />
        <button type="submit">Crear curso</button>
      </form>
      {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
    </div>
  );
}
