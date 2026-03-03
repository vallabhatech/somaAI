import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import deepakPhoto from "../assets/RACHAKONDA ADITHYA RAM.jpg";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      <Navbar />
      {/* <Header /> */}
      {isHome && <Hero />}
      <HowItWorks />
      <Challenge />
      <WhySomaAI />
      <FAQ />
      <Team />
      <Footer />
    </div>
  );
}

// FIXED HEADER: Proper vertical alignment, single-line nav, spacing, and responsiveness
function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 focus:outline-none">
          <div className="h-8 w-8 rounded-xl bg-emerald-600 grid place-items-center text-white font-black shadow-md transition-all duration-300">
            S
          </div>
          <span className="font-semibold tracking-tight text-lg">SomaAI</span>
        </Link>
        <nav className="flex gap-8 text-sm font-medium">
          <a href="#how" className="hover:text-emerald-700 transition-colors duration-200">How it Works</a>
          <a href="#challenge" className="hover:text-emerald-700 transition-colors duration-200">Challenge</a>
          <a href="#why" className="hover:text-emerald-700 transition-colors duration-200">Why SomaAI</a>
          <a href="#faq" className="hover:text-emerald-700 transition-colors duration-200">FAQ</a>
          <Link to="/lessons" className="hover:text-emerald-700 transition-colors duration-200">Lessons</Link>
          <Link to="/chat" className="hover:text-emerald-700 transition-colors duration-200">Chatbot</Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-blue-50 to-emerald-50/30 overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center justify-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-center">
          Your Private Health Companion
        </h1>
        <p className="mt-4 text-slate-600 text-base md:text-lg max-w-prose text-center">
          SomaAI provides confidential, non-judgmental, and accurate sexual health education for youth. Ask anything, anytime.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/chat" className="px-6 py-3 text-lg rounded-xl bg-emerald-600 text-white shadow-lg font-bold hover:scale-105 transition-all" replace>
            Try SomaAI Chat
          </Link>
          <Link to="/lessons" className="px-6 py-3 text-lg rounded-xl bg-white border border-emerald-400 text-emerald-700 shadow hover:bg-emerald-50 transition-all font-bold" replace>
            Browse Lessons
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight mb-6">
          How SomaAI Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="rounded-2xl bg-blue-50 shadow p-6 flex flex-col items-center">
            <span className="mb-2 text-3xl">🤖</span>
            <h3 className="font-semibold mb-2 text-lg">Ask Anything</h3>
            <p className="text-slate-700">Type your question or browse our lessons. No topic is off-limits—SomaAI is here for you.</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 shadow p-6 flex flex-col items-center">
            <span className="mb-2 text-3xl">🔒</span>
            <h3 className="font-semibold mb-2 text-lg">Private & Safe</h3>
            <p className="text-slate-700">No personal info, no judgment. We keep your questions private and never store who you are.</p>
          </div>
          <div className="rounded-2xl bg-pink-50 shadow p-6 flex flex-col items-center">
            <span className="mb-2 text-3xl">🌍</span>
            <h3 className="font-semibold mb-2 text-lg">Learn & Grow</h3>
            <p className="text-slate-700">Get simple, accurate, culturally respectful answers—plus videos and myth-busting facts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Challenge() {
  const cards = [
    {
      title: "Adolescent Fertility",
      stat: "1 in 5",
      desc: "girls aged 15–19 becomes pregnant in Sub-Saharan Africa.",
      icon: "👧",
      color: "from-pink-100 via-orange-100 to-pink-50"
    },
    {
      title: "HIV Infections",
      stat: "4,000+",
      desc: "new HIV infections occur weekly among young women aged 15–24.",
      icon: "🧬",
      color: "from-sky-100 via-blue-100 to-sky-50"
    },
    {
      title: "Youth Population",
      stat: "60%",
      desc: "of Africa’s population is under the age of 25.",
      icon: "💧",
      color: "from-emerald-100 via-green-100 to-emerald-50"
    },
    {
      title: "Impact Potential",
      stat: "Education is Key",
      desc: "Access to information can prevent pregnancies and save lives.",
      icon: "💚",
      color: "from-green-100 via-emerald-100 to-green-50"
    },
  ];

  return (
    <section id="challenge" className="bg-gradient-to-b from-emerald-50 via-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight mb-3">
          The Challenge We Face
        </h2>
        <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto mb-10">
          Lack of access to accurate sexual health education has critical consequences
          for youth in Sub-Saharan Africa.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-gradient-to-br ${c.color} border border-emerald-100 shadow-md p-6`}
            >
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2 font-semibold">
                <span className="text-xl">{c.icon}</span>
                <span>{c.title}</span>
              </div>
              <div className="mt-2 text-2xl font-black tracking-tight text-emerald-700">{c.stat}</div>
              <p className="mt-1 text-sm text-slate-700">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySomaAI() {
  return (
    <section id="why" className="bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight mb-6">
          Why SomaAI?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="rounded-2xl shadow bg-white p-8">
            <span className="text-4xl mb-3 block">📖</span>
            <h3 className="font-bold mb-2">Always Up-to-Date</h3>
            <p className="text-slate-700">SomaAI learns from the latest trusted resources and is regularly updated by health experts.</p>
          </div>
          <div className="rounded-2xl shadow bg-white p-8">
            <span className="text-4xl mb-3 block">🌐</span>
            <h3 className="font-bold mb-2">Multi-Lingual</h3>
            <p className="text-slate-700">Use SomaAI in English, French, Portuguese, Swahili, Spanish, Hindi, and more. Inclusive for all backgrounds.</p>
          </div>
          <div className="rounded-2xl shadow bg-white p-8">
            <span className="text-4xl mb-3 block">🧑‍🤝‍🧑</span>
            <h3 className="font-bold mb-2">Community Driven</h3>
            <p className="text-slate-700">Built with the help of youth and health educators to answer real questions, not just textbook ones.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "What is HIV?",
      a: "HIV is a virus that attacks the immune system. It can be prevented with safer sex and not sharing needles. Testing is important.",
    },
    {
      q: "How can I prevent pregnancy?",
      a: "Use reliable contraception like condoms, pills, implants, or injections. Condoms also help lower STI risk.",
    },
    {
      q: "What are contraceptives?",
      a: "Methods to prevent pregnancy. Examples: condoms, pills, IUDs/implants, injections, and more.",
    },
    {
      q: "What is consent?",
      a: "Clear, freely given agreement. Everyone must say yes without pressure. Consent can be changed at any time.",
    },
    {
      q: "How are STIs spread?",
      a: "Mostly through unprotected sexual contact. Condoms and testing reduce risk. See a clinic if you have symptoms.",
    },
  ];

  return (
    <section id="faq" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 rounded-2xl border border-slate-100 divide-y divide-slate-100 bg-white">
          {items.map((item, i) => (
            <details
              key={i}
              className="group p-4 transition-all duration-300"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none focus:outline-none">
                <span className="font-medium">{item.q}</span>
                <span className="text-slate-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-2 text-sm text-slate-700 transition-all duration-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="bg-gradient-to-t from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 tracking-tight">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <div className="w-48 h-48 rounded-full shadow overflow-hidden flex items-center justify-center bg-slate-200">
              <img
                src={deepakPhoto}
                alt="RACHAKONDA ADITHYA RAM"
                className="w-full h-full object-cover object-center"
                draggable={false}
                style={{aspectRatio: "1/1"}}
              />
            </div>
            <span className="font-bold mt-2">RACHAKONDA ADITHYA RAM</span>
            <span className="text-sm text-slate-500">Full Stack Dev</span>
          </div>
        </div>
        <p className="text-center mt-8 text-slate-700 max-w-2xl mx-auto">
          We’re passionate about empowering youth with knowledge and support. Want to help? <a href="mailto:hello@somaai.org" className="text-emerald-600 underline">Get in touch</a>.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-500 bg-gradient-to-t from-emerald-50 to-white">
      © {new Date().getFullYear()} SomaAI — Education tool, not medical advice.
    </footer>
  );
}