import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
      localStorage.setItem("userId", response.data.id);
      navigate("/dashboard");
    } catch {
      setMessage("Those details didn't match an account. Try again.");
    } finally { setBusy(false); }
  };

  return <main className="grid min-h-screen bg-paper lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden overflow-hidden bg-[#303b30] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full border border-white/10"/><div className="absolute -bottom-36 -left-24 h-[34rem] w-[34rem] rounded-full border border-white/10"/>
      <Link to="/register" className="relative z-10 flex items-center gap-3 text-white no-underline"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 font-display text-xl">r.</span><span className="font-display text-2xl">roomiesync</span></Link>
      <div className="relative z-10 max-w-xl pb-12"><p className="mb-5 text-xs font-semibold uppercase tracking-[.25em] text-[#c8d3bc]">A better way to live together</p><h1 className="font-display text-6xl leading-[1.05]">Good homes start with the right people.</h1><p className="mt-6 max-w-md text-base leading-7 text-white/70">Find people whose routines, priorities and idea of home feel like yours.</p></div>
      <p className="relative z-10 text-xs text-white/45">A little more considered. A lot more at home.</p>
    </section>
    <section className="flex items-center justify-center px-6 py-14">
      <form onSubmit={submit} className="w-full max-w-md">
        <Link to="/register" className="mb-12 inline-flex items-center gap-2 font-display text-2xl text-ink no-underline lg:hidden"><span className="grid h-9 w-9 place-items-center rounded-xl bg-sage-600 text-white">r.</span> roomiesync</Link>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-sage-600">Welcome back</p><h2 className="mt-3 font-display text-5xl text-ink">Good to see you.</h2><p className="mt-3 text-sm leading-6 text-stone-500">Sign in to pick up where you left off.</p>
        <label className="mt-9 block text-sm font-semibold text-stone-700">Email address<input type="email" autoComplete="email" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-stone-300 bg-white px-4 outline-none transition focus:border-sage-600 focus:ring-4 focus:ring-sage-100" placeholder="you@example.com"/></label>
        <label className="mt-5 block text-sm font-semibold text-stone-700">Password<input type="password" autoComplete="current-password" required value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-stone-300 bg-white px-4 outline-none transition focus:border-sage-600 focus:ring-4 focus:ring-sage-100" placeholder="Your password"/></label>
        <button disabled={busy} className="mt-7 flex h-12 w-full items-center justify-center rounded-lg bg-sage-600 text-sm font-semibold text-white transition hover:bg-sage-700 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        {message && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
        <p className="mt-7 text-center text-sm text-stone-500">New to RoomieSync? <Link to="/register" className="font-semibold text-sage-700 hover:underline">Create an account</Link></p>
      </form>
    </section>
  </main>;
}
