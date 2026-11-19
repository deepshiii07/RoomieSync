import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/match", label: "Find roommates" },
  { to: "/my-profile", label: "My profile" },
  { to: "/set-preferences", label: "Preferences" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("userId"); navigate("/login"); };
  return <header className="sticky top-0 z-40 border-b border-[#e8e7df] bg-[#fbfaf7]/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
      <NavLink to="/dashboard" className="flex shrink-0 items-center gap-3 no-underline">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-600 font-display text-xl text-white">r.</span>
        <span><span className="block font-display text-2xl leading-none text-ink">roomiesync</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.22em] text-stone-500">find your kind of home</span></span>
      </NavLink>
      <nav className="hidden items-center gap-1 md:flex">
        {links.map(link => <NavLink key={link.to} to={link.to} className={({isActive}) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-sage-100 text-sage-700" : "text-stone-600 hover:bg-stone-100 hover:text-ink"}`}>{link.label}</NavLink>)}
      </nav>
      <button onClick={logout} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-ink hover:bg-ink hover:text-white">Log out</button>
    </div>
    <nav className="flex gap-1 overflow-x-auto border-t border-stone-100 px-4 py-2 md:hidden">
      {links.map(link => <NavLink key={link.to} to={link.to} className={({isActive}) => `whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold ${isActive ? "bg-sage-100 text-sage-700" : "text-stone-500"}`}>{link.label}</NavLink>)}
    </nav>
  </header>;
}
