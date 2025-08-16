import Header from "../../components/Header";
import Card from "../../components/dashboard/Card";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 md:py-8 lg:py-10">
        <section className="text-center space-y-2 md:space-y-3 mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Bienvenido a
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Explora Admin
          </h2>
          <p className="mt-2 text-base md:text-lg text-zinc-700">
            ¿Qué desea realizar?
          </p>
        </section>

        <section
          className="
            grid gap-4 md:gap-6
            [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
          "
        >
          <Card color="bg-purple-card" title="Crear" subtitle="Planificacion" iconName="plus-lg"/>
          <Card color="bg-orange-card" title="Planificaciones" iconName="journal-text" />
          <Card color="bg-brick-card"  title="Unidades" subtitle="Educativas" iconName="house-door-fill" />
          <Card color="bg-green-card"  title="Docentes" iconName="person-fill" />
        </section>
      </main>
    </div>
  );
}
