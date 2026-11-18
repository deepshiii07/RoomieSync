import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    axios.get(`${API_BASE_URL}/api/users/${userId}`).then(r=>setUser(r.data)).catch(()=>setUser(null));
  }, [userId, navigate]);

  return <div className="min-h-screen bg-paper"><Navbar/><main className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8">
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-sage-600">YOUR ROOMIESYNC</p><h1 className="mt-3 font-display text-5xl leading-tight text-ink md:text-6xl">A home that feels<br className="hidden md:block"/> like yours.</h1><p className="mt-4 max-w-xl text-base leading-7 text-stone-500">Hey{user?.name ? `, ${user.name.split(" ")[0]}` : ""}. Let's find the people and place that make everyday living better.</p></div><Link to="/match" className="inline-flex items-center justify-center rounded-lg bg-sage-600 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-sage-700">Explore roommates <span className="ml-3">↗</span></Link></div>
    <section className="relative overflow-hidden rounded-2xl bg-[#354333] p-8 text-white shadow-soft md:p-12"><div className="absolute -right-10 -top-24 h-80 w-80 rounded-full border border-white/10"/><div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/10"/><div className="relative max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#c9d5bf]">The good roommate equation</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Shared spaces.<br/>Respected routines. Better days.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-white/70">Tell us where you'd like to live and what matters at home. We'll help you discover people looking for a similar kind of everyday.</p><Link to="/set-preferences" className="mt-7 inline-flex rounded-lg bg-[#e4e9dc] px-5 py-3 text-sm font-semibold text-[#34422f] no-underline transition hover:bg-white">Set your preferences <span className="ml-3">→</span></Link></div></section>
    <section className="mt-10 grid gap-4 md:grid-cols-3">
      {[{n:"01",t:"Your city",d:"Start with where life is taking you.",to:"/edit-profile",cta:"Update your profile"},{n:"02",t:"Your kind of home",d:"Choose the neighbourhood and routines that suit you.",to:"/set-preferences",cta:"Set preferences"},{n:"03",t:"Your people",d:"Meet potential roommates with a similar plan.",to:"/match",cta:"View matches"}].map(item=><Link key={item.n} to={item.to} className="group rounded-xl border border-stone-200 bg-white p-6 text-inherit no-underline transition hover:-translate-y-1 hover:border-sage-300 hover:shadow-soft"><span className="text-xs font-bold tracking-[.18em] text-clay">{item.n}</span><h3 className="mt-5 font-display text-2xl">{item.t}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">{item.d}</p><span className="mt-5 inline-flex text-sm font-semibold text-sage-700">{item.cta} <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>)}
    </section>
  </main></div>;
}
