// ayushiii
// src/components/Hero.jsx
"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./ui/card";
import { useTheme } from "../contexts/ThemeContext";

// Theme background helpers
const getThemeBackgroundClass = (theme) => {
  switch (theme) {
    case "blue":   return "bg-blue-light";
    case "purple": return "bg-purple-light";
    case "green":  return "bg-green-light";
    case "dark":   return "bg-dark-light";
    default:       return "bg-white";
  }
};
const getNeuralOverlayColor = (theme) => {
  switch (theme) {
    case "blue":   return "rgba(30,58,138,0.18)";
    case "purple": return "rgba(91,33,182,0.17)";
    case "green":  return "rgba(4,120,87,0.16)";
    case "dark":   return "rgba(31,41,55,0.23)";
    default:       return "rgba(234,88,12,0.14)";
  }
};

// auto-slide hook
function useAutoSlide(length, current, setCurrent, interval = 7000) {
  useEffect(() => {
    const t = setTimeout(() => setCurrent((i) => (i + 1) % length), interval);
    return () => clearTimeout(t);
  }, [length, current, setCurrent, interval]);
}

// neural grid background
function GradientGridBackground({ theme }) {
  const overlay = getNeuralOverlayColor(theme);
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.16,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        style={{ mixBlendMode: "multiply" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="neuralLine" x1="0" y1="0" x2="800" y2="870">
            <stop stopColor={overlay} />
            <stop offset="1" stopColor={overlay} />
          </linearGradient>
        </defs>
        <polyline
          points="30,600 260,220 420,340 660,140 980,340 1200,210 1400,430"
          stroke="url(#neuralLine)"
          strokeWidth="7"
          strokeDasharray="6 16"
          className="animate-ai-line"
        />
        {[260, 420, 660, 980, 1200].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={i % 2 === 0 ? 220 : 340}
            r={12}
            fill={overlay}
            className="animate-ai-node"
          />
        ))}
      </svg>
      <span
        className="absolute right-4 sm:right-10 top-2/3 font-mono animate-fade-in-late"
        style={{ color: overlay, opacity: 0.18 }}
      >
        &lt;/ai&gt;
      </span>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const [slideIndex, setSlideIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const rawSlides = t("hero.slides", { returnObjects: true }) || [];
  const discuss    = t("hero.discussionSection", { returnObjects: true });
  const impact     = t("hero.impactSection", { returnObjects: true });

  const slides = rawSlides.map((s, i) => ({
    ...s,
    ...(i === 0
      ? { type: "content", ceoImage: "/Images/instructor.png" }
      : { type: "image", image: i === 1 ? "/home_page.png" : "/students.jpeg" }
    ),
  }));

  useAutoSlide(slides.length, slideIndex, setSlideIndex);

  useEffect(() => {
    const m = (e) =>
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const slide = slides[slideIndex] || {};
  const bgClass = getThemeBackgroundClass(currentTheme);

  // Shared orange→amber gradient for buttons
  const gradientBtn =
    "bg-gradient-to-r from-orange-600 to-amber-600 " +
    "hover:from-orange-700 hover:to-amber-500 " +
    "text-white font-semibold";

  // Renderers
  const renderContentSlide = (s) => (
    <div className="flex flex-col md:flex-row w-full min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-24">
      <div className="flex-1 py-10 sm:py-16 flex flex-col gap-2 z-10">
        <p
          className="text-lg sm:text-xl font-medium tracking-wider animate-fade-in"
          style={{ animationDelay: "0.1s", color: "var(--accent-color,#60a5fa)" }}
        >
          {s.subtitle}
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent animate-fade-in mb-1"
          style={{
            animationDelay: "0.2s",
            backgroundImage:
              "linear-gradient(90deg, var(--primary-color,#1e40af), var(--secondary-color,#3b82f6))",
          }}
        >
          {s.title}
        </h1>
        <p
          className="text-sm sm:text-base md:text-lg mb-1 animate-fade-in"
          style={{ animationDelay: "0.3s", color: "var(--text-color,#1e3a8a)" }}
        >
          {s.description}
        </p>
        <p
          className="text-xs sm:text-sm font-semibold mt-1 animate-fade-in"
          style={{ animationDelay: "0.35s", color: "var(--secondary-color,#3b82f6)" }}
        >
          {s.sponsor}
        </p>
        <div className="mt-5 sm:mt-7">
          <button
            className={`${gradientBtn} rounded-lg px-5 sm:px-7 py-2 sm:py-3 font-bold shadow hover:scale-105 transition-transform duration-200 animate-fade-in`}
            style={{ animationDelay: "0.55s" }}
          >
            {s.button}
          </button>
        </div>
      </div>
      <div className="flex-1 hidden md:flex justify-center items-center relative">
        <Card
          className="rounded-full overflow-hidden shadow-lg w-40 h-40 sm:w-52 sm:h-52 p-1.5 sm:p-2"
          style={{
            border: "3px solid var(--primary-color,#1e40af)",
            background:
              "linear-gradient(135deg,var(--primary-color,#1e40af)11 60%,transparent)",
          }}
        >
          <img
            src={s.ceoImage}
            alt="Instructor"
            className="w-full h-full object-cover rounded-full"
          />
        </Card>
        <span
          className="absolute -bottom-1 -right-1 font-mono px-3 py-1.5 rounded-xl animate-ai-accent"
          style={{ background: "var(--secondary-color,#3b82f6)", color: "#fff", opacity: 0.8 }}
        >
          AI
        </span>
      </div>
    </div>
  );

  const renderImageSlide = (s) => (
    <div className="flex flex-col md:flex-row w-full min-h-[80vh] items-center px-4 sm:px-6 lg:px-16 mx-auto max-w-[1400px]">
      <div className="w-full md:w-2/5 flex justify-center items-center py-8 md:py-0">
        <Card
          className="rounded-xl overflow-hidden shadow-2xl w-full md:w-[85%] animate-fade-in"
          style={{
            background: "var(--surface-color,#dbeafe)",
            border: "1px solid var(--border-color,#93c5fd)",
          }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
            style={{ filter: "brightness(0.89)", borderRadius: "16px 16px 0 0" }}
          />
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <h2
              className="text-lg sm:text-xl md:text-2xl font-bold mb-1"
              style={{ color: "var(--primary-color,#1e40af)" }}
            >
              {s.title}
            </h2>
            <p
              className="text-xs sm:text-sm md:text-base mb-2"
              style={{ color: "var(--text-secondary,#3730a3)" }}
            >
              {s.subtitle}
            </p>
            <button
              className={`${gradientBtn} rounded px-4 sm:px-5 py-1.5 sm:py-2 font-bold shadow hover:scale-105 transition-all`}
            >
              {s.button}
            </button>
          </div>
        </Card>
      </div>
      <div className="w-full md:w-3/5 flex flex-col items-center justify-center py-4 md:py-0">
        {slideIndex === 1 && (
          <div
            className="rounded-xl shadow-md p-6 border animate-fade-in-late"
            style={{
              background: "var(--background-color,#eff6ff)",
              border: "1.5px solid var(--border-color,#93c5fd)",
            }}
          >
            <h3
              className="text-xl font-extrabold mb-3"
              style={{ color: "var(--primary-color,#1e40af)" }}
            >
              {discuss.title}
            </h3>
            <ul
              className="list-disc ml-5 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary,#3730a3)" }}
            >
              {discuss.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs" style={{ color: "var(--text-secondary,#3730a3)" }}>
              {discuss.description}
            </p>
          </div>
        )}
        {slideIndex === 2 && (
          <div
            className="rounded-xl shadow-md p-6 border animate-fade-in-late"
            style={{
              background: "var(--background-color,#eff6ff)",
              border: "1.5px solid var(--border-color,#93c5fd)",
            }}
          >
            <h3
              className="text-xl font-extrabold mb-3"
              style={{ color: "var(--primary-color,#1e40af)" }}
            >
              {impact.title}
            </h3>
            <ul
              className="list-disc ml-5 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary,#3730a3)" }}
            >
              {impact.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs" style={{ color: "var(--text-secondary,#3730a3)" }}>
              {impact.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <section
        className={`${bgClass} relative w-full flex flex-col justify-center overflow-hidden transition-colors duration-300`}
        style={{ minHeight: "80vh", color: "var(--text-color,#1e3a8a)" }}
      >
        <GradientGridBackground theme={currentTheme} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(600px at ${mousePos.x}% ${mousePos.y}%, var(--accent-color,#60a5fa) 15%, transparent 100%)`,
            opacity: 0.30,
          }}
        />
        <div
          key={slideIndex}
          className="relative z-20 w-full h-full transition-opacity duration-800 animate-slide-fade"
          style={{ minHeight: "80vh" }}
        >
          {slide.type === "content" ? renderContentSlide(slide) : renderImageSlide(slide)}
        </div>
        <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:bottom-auto md:left-4 lg:left-8 md:top-1/2 md:-translate-y-1/2 md:flex-col">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-colors duration-300 ${
                slideIndex === i ? "shadow-md bg-opacity-20" : "opacity-60 hover:bg-opacity-15"
              }`}
              style={{
                borderColor: "var(--primary-color,#1e40af)",
                background: slideIndex === i
                  ? "var(--accent-color,#60a5fa)"
                  : "var(--surface-color,#dbeafe)",
              }}
            >
              <span
                className="absolute left-1/2 top-1/2 block rounded-full transition-all duration-300"
                style={{
                  width: slideIndex === i ? 12 : 8,
                  height: slideIndex === i ? 12 : 8,
                  background: "var(--primary-color,#1e40af)",
                  transform: "translate(-50%,-50%)",
                  opacity: slideIndex === i ? 0.92 : 0.44,
                }}
              />
            </button>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes ai-line      { to { stroke-dashoffset: 0; } }
        @keyframes ai-node      { 50% { opacity: 1; r: 13; } }
        @keyframes ai-accent    { 50% { opacity: 1; transform: translateY(-7px); } }
        @keyframes fade-in      { to { opacity: 1; filter: blur(0); } }
        @keyframes fade-in-late { to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-fade   { to { opacity: 1; transform: translateY(0); } }
        .animate-ai-line       { animation: ai-line 4s linear forwards; }
        .animate-ai-node       { animation: ai-node 2.8s ease-in-out infinite; }
        .animate-ai-accent     { animation: ai-accent 3.4s ease-in-out infinite; }
        .animate-fade-in       { animation: fade-in 0.95s 0.05s both; }
        .animate-fade-in-late  { animation: fade-in-late 1.3s 0.3s both; }
        .animate-slide-fade    { animation: slide-fade 0.67s both; }
      `}</style>
    </>
  );
}
