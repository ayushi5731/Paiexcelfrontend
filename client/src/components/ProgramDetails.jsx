// ayushiii
// src/components/ProgramDetails.jsx
"use client"
import { useTranslation } from "react-i18next"
import { useTheme } from "../contexts/ThemeContext"

const ProgramDetails = () => {
  const { t } = useTranslation()
  const { currentTheme } = useTheme()

  // Theme-specific classes
  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-light",
          title: "text-blue-primary",
          text: "text-blue-text",
          buttonPrimary: "bg-blue-primary text-white hover:bg-blue-dark",
          buttonSecondary: "bg-blue-50 text-blue-primary hover:bg-blue-100",
        }
      case "purple":
        return {
          background: "bg-purple-light",
          title: "text-purple-primary",
          text: "text-purple-text",
          buttonPrimary: "bg-purple-primary text-white hover:bg-purple-dark",
          buttonSecondary: "bg-purple-50 text-purple-primary hover:bg-purple-100",
        }
      case "green":
        return {
          background: "bg-green-light",
          title: "text-green-primary",
          text: "text-green-text",
          buttonPrimary: "bg-green-primary text-white hover:bg-green-dark",
          buttonSecondary: "bg-green-50 text-green-primary hover:bg-green-100",
        }
      case "dark":
        return {
          background: "bg-dark-light",
          title: "text-dark-primary",
          text: "text-dark-text",
          buttonPrimary: "bg-dark-primary text-white hover:bg-amber-600",
          buttonSecondary: "bg-dark-dark text-dark-primary hover:bg-gray-800",
        }
      default:
        return {
          background: "bg-white",
          title: "text-orange-600",
          text: "text-gray-800",
          buttonPrimary: "bg-orange-600 text-white hover:bg-orange-700",
          buttonSecondary: "bg-orange-200 text-black hover:bg-orange-300",
        }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <section className={`py-12 px-6 md:px-16 ${themeClasses.background} themed-surface transition-colors duration-300`}>
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* LEFT SIDE: Text and Buttons */}
        <div>
          <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.title} mb-6 themed-text-primary`}>
            {t("programDetailsSection.title")}
          </h2>

          <ul className={`space-y-4 ${themeClasses.text} themed-text-secondary`}>
            <li>{t("programDetailsSection.points.point1")}</li>
            <li>{t("programDetailsSection.points.point2")}</li>
            <li>{t("programDetailsSection.points.point3")}</li>
            <li>{t("programDetailsSection.points.point4")}</li>
            <li>{t("programDetailsSection.points.point5")}</li>
          </ul>

          {/* Buttons: Join Live Event uses secondary bg without border */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Join Live Event (no border, secondary bg) */}
            <button
              onClick={() => (window.location.href = "/course-details")}
              className={`${themeClasses.buttonSecondary} border-none font-medium py-2 px-4 rounded transition-colors duration-300`}
            >
              {t("programDetailsSection.button2")}
            </button>

            {/* Media Coverage Link */}
            <button
              onClick={() => (window.location.href = "/media-coverage")}
              className={`${themeClasses.buttonSecondary} border font-medium py-2 px-4 rounded transition-colors duration-300`}
            >
              {t("programDetailsSection.button3")}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Video */}
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg mt-6 md:mt-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/WEmcjN655Bw"
            title="ਬッチਿਆਂ ਨੂੰ ਭवਿੱਖ ਲਈ ਤਿਆਰ ਕਰੋ – Practical AI Classes"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default ProgramDetails
