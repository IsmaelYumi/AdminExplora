"use client";
import HamburgerDrawer from "./header/hamburger";

export default function Header() {
  return (
    <header className="position-sticky top-0 z-1 backdrop-blur bg-header/90">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <div className="d-flex align-items-center justify-content-between h-16">
            <div className="d-flex align-items-center gap-3">
              <HamburgerDrawer />
              <div className="d-flex align-items-center justify-content-center bg-white/80 shadow-md h-10 w-30 rounded-full">
                <span className="fw-bold fs-5">Explora</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="d-none d-sm-inline fw-semibold text-[15px]">User</span>
              <button className="btn p-2 rounded-md hover:bg-white/30 border-0 bg-transparent" aria-label="Salir">
                <i className="bi bi-box-arrow-right fs-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
