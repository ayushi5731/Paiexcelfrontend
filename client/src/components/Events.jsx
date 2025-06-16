// ayushiii
// src/components/Events.jsx
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

export default function Events() {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);
  const { currentTheme } = useTheme();

  const themeClasses = (() => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-50",
          title: "text-blue-800",
          text: "text-blue-600",
          button:
            "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold",
        };
      case "purple":
        return {
          background: "bg-purple-50",
          title: "text-purple-800",
          text: "text-purple-600",
          button:
            "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-semibold",
        };
      case "green":
        return {
          background: "bg-green-50",
          title: "text-green-800",
          text: "text-green-600",
          button:
            "bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold",
        };
      case "dark":
        return {
          background: "bg-gray-900",
          title: "text-yellow-400",
          text: "text-gray-300",
          button:
            "bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500 text-gray-900 font-semibold",
        };
      default:
        return {
          background: "bg-[#FFF7ED]",
          title: "text-[#44425A]",
          text: "text-[#6C6A74]",
          button:
            "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-500 text-white font-semibold",
        };
    }
  })();

  const eventsData = t("events.events", { returnObjects: true }) || [];

  // pull the instructor/keyTakeaways/whoJoined strings
  const [instructorLabel, instructorValue] = t("courseDetail.instructor", "").split(/:(.+)/);
  const [takeawaysLabel, takeawaysValue] = t("courseDetail.keyTakeaways", "").split(/:(.+)/);
  const [joinedLabel, joinedValue] = t("courseDetail.whoJoined", "").split(/:(.+)/);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`relative space-y-12 px-6 lg:px-20 pt-4 pb-20 ${themeClasses.background}`}>
      {/* Hero Section */}
      <section className="relative text-center py-20">
        <h1 className={`text-4xl font-bold ${themeClasses.title} mb-4`}>
          {t("events.heading")}
        </h1>
        <p className={`text-lg ${themeClasses.text}`}>
          {t("events.subheading")}
        </p>
      </section>

      {/* Event List */}
      {eventsData.map((evt, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Event Image */}
          <div className="w-full md:w-2/5">
            <img
              src={`/Images/Event${idx + 1}.png`}
              alt={evt.title}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-3/5">
            <h3 className={`text-2xl font-semibold ${themeClasses.title} mb-2`}>
              {evt.title}
            </h3>
            <p className={`${themeClasses.text} mb-4`}>{evt.description}</p>

            {expandedId === idx && (
              <>
                {/* the original moreInfo */}
                <p className={`${themeClasses.text} mb-4`}>{evt.moreInfo}</p>

                {/* mapped instructor */}
                <p className={`${themeClasses.text} mb-2`}>
                  <strong>{instructorLabel}:</strong> {instructorValue}
                </p>
                {/* mapped keyTakeaways */}
                <p className={`${themeClasses.text} mb-2`}>
                  <strong>{takeawaysLabel}:</strong> {takeawaysValue}
                </p>
                {/* mapped whoJoined */}
                <p className={`${themeClasses.text} mb-4`}>
                  <strong>{joinedLabel}:</strong> {joinedValue}
                </p>
              </>
            )}

            <button
              onClick={() => toggleExpand(idx)}
              className={`py-2 px-6 rounded-full transition ${themeClasses.button}`}
            >
              {expandedId === idx ? t("events.showLess") : t("events.knowMore")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
