"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function HamburgerDrawer({ items }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firstRef = useRef(null);
  const lastRef  = useRef(null);
  const triggerRef = useRef(null);

  const loginUrl = `${process.env.NEXT_PUBLIC_CANVAS_BASE_URL}/login/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_CANVAS_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_CANVAS_REDIRECT_URI}`;

  const menuItems = items || [
    { label: "Crear Planificación", href: "#" },
    { label: "Planificaciones",    href: "#" },
    { label: "Unidades Educativas", href: "#" },
    { label: "Docentes",            href: "#" },
    { label: "Iniciar sesión con Canvas", href: loginUrl } // Nuevo ítem
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onTrap = (e) => {
      if (e.key !== "Tab") return;
      const first = firstRef.current, last = lastRef.current;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onTrap);
    return () => document.removeEventListener("keydown", onTrap);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-label="Abrir menú"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="app-drawer"
        onClick={() => setOpen(true)}
        className="btn p-2 rounded-md border-0 bg-transparent hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-black/20"
      >
        <i className="bi bi-list fs-4" />
      </button>

      {mounted && open && createPortal(
        <>
          <div
            role="presentation"
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 transition-opacity duration-200 opacity-100 z-[1200]"
          />

          <aside
            id="app-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="fixed top-0 left-0 bg-white shadow-lg w-72 h-dvh z-[1210] transition-transform duration-200 ease-out translate-x-0"
            style={{ overscrollBehavior: "contain" }}
          >
            <div className="d-flex align-items-center justify-content-between px-4 h-16 bg-header">
              <div id="drawer-title" className="fw-semibold">Menú</div>
              <button
                ref={firstRef}
                onClick={() => setOpen(false)}
                className="btn p-2 rounded-md border-0 bg-transparent hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-black/20"
                aria-label="Cerrar"
              >
                <i className="bi bi-x-lg fs-5" />
              </button>
            </div>

            <nav className="py-2">
              {menuItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="d-block px-4 py-3 link-plain text-body-emphasis hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 transition-colors"
                  onClick={() => setOpen(false)}
                  ref={idx === menuItems.length - 1 ? lastRef : null}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
