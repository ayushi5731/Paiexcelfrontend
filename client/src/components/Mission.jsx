// ayushiiii
// src/components/Mission.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const Mission = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const achievements = t("mission.achievements", { returnObjects: true });

  const theme = (() => {
    switch (currentTheme) {
      case "blue":
        return {
          bg: "bg-blue-light",
          title: "text-blue-primary",
          text: "text-blue-text",
          accent: "bg-blue-primary",
        };
      case "purple":
        return {
          bg: "bg-purple-light",
          title: "text-purple-primary",
          text: "text-purple-text",
          accent: "bg-purple-primary",
        };
      case "green":
        return {
          bg: "bg-green-light",
          title: "text-green-primary",
          text: "text-green-text",
          accent: "bg-green-primary",
        };
      case "dark":
        return {
          bg: "bg-dark-light",
          title: "text-dark-primary",
          text: "text-dark-text",
          accent: "bg-dark-primary",
        };
      default:
        return {
          bg: "bg-[#FFF7ED]",
          title: "text-orange-600",
          text: "text-gray-900",
          accent: "bg-orange-600",
        };
    }
  })();

  const steps = [
    {
      img: "/Images/img1.png",
      label: "Empower Rural Women",
      desc: "Workshops in village centers",
    },
    {
      img: "/Images/img2.png",
      label: "Hands-On AI Training",
      desc: "Practical labs & demos",
    },
    {
      img: "/Images/img3.png",
      label: "Ongoing Mentorship",
      desc: "Remote support & guidance",
    },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setCurrent((i) => (i + 1) % steps.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className={`${theme.bg} py-20 transition-colors duration-300`}>
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side */}
        <div className="w-full lg:w-1/2">
          {/* Desktop: curved path */}
          <div className="relative h-96 hidden lg:flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
            >
              <path
                d="M50,250 C200,50 400,50 550,250"
                stroke={theme.accent}
                strokeWidth="6"
                fill="none"
              />
            </svg>
            {steps.map((step, idx) => {
              const x = 50 + (500 * idx) / (steps.length - 1);
              const y = 250 - (200 * idx) / (steps.length - 1);
              const isThird = idx === 2;
              return (
                <div
                  key={idx}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <AnimatePresence exitBeforeEnter>
                    {current === idx && (
                      <motion.img
                        src={step.img}
                        alt={step.label}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: isThird ? 1.1 : 1.2, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`rounded-full shadow-2xl object-cover border-4 border-white ${
                          isThird ? "w-24 h-24" : "w-32 h-32"
                        }`}
                      />
                    )}
                  </AnimatePresence>
                  <div className="mt-3">
                    <div
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded ${theme.accent} text-white`}
                    >
                      {step.label}
                    </div>
                    <p className="text-xs mt-1 text-gray-700">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack with larger icons */}
          <div className="flex flex-col items-center space-y-10 lg:hidden">
            {steps.map((step, idx) => {
              const isThird = idx === 2;
              return (
                <div key={idx} className="text-center">
                  <AnimatePresence exitBeforeEnter>
                    {current === idx && (
                      <motion.img
                        src={step.img}
                        alt={step.label}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`rounded-full shadow-2xl object-cover border-4 border-white ${
                          isThird ? "w-32 h-32" : "w-36 h-36"
                        }`}
                      />
                    )}
                  </AnimatePresence>
                  <div className="mt-3">
                    <div
                      className={`inline-block px-4 py-2 text-sm sm:text-base font-semibold rounded ${theme.accent} text-white`}
                    >
                      {step.label}
                    </div>
                    <p className="text-sm sm:text-base mt-1 text-gray-700">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className={`text-2xl ${theme.title} font-semibold mb-2 uppercase`}>
            {t("mission.title")}
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.text} mb-6 leading-snug`}>
            {t("mission.description").split(".")[0]}.
          </h2>
          <p className={`${theme.text} mb-4`}>
            {t("mission.description").split(".").slice(1).join(".")}
          </p>
          <ul className={`${theme.text} space-y-2 list-disc pl-5`}>
            {achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Mission;
