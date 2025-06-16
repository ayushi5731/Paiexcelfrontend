// ayushiiii
"use client";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { currentTheme } = useTheme();

  // Theme mapping function
  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-50",
          border: "border-blue-200",
          title: "text-blue-800",
          text: "text-blue-600",
          icon: "text-blue-600 hover:text-blue-800",
          button: "bg-blue-600 hover:bg-blue-700",
          input: "focus:border-blue-500",
          activeLink: "text-blue-600",
        };
      case "purple":
        return {
          background: "bg-purple-50",
          border: "border-purple-200",
          title: "text-purple-800",
          text: "text-purple-600",
          icon: "text-purple-600 hover:text-purple-800",
          button: "bg-purple-600 hover:bg-purple-700",
          input: "focus:border-purple-500",
          activeLink: "text-purple-600",
        };
      case "green":
        return {
          background: "bg-green-50",
          border: "border-green-200",
          title: "text-green-800",
          text: "text-green-600",
          icon: "text-green-600 hover:text-green-800",
          button: "bg-green-600 hover:bg-green-700",
          input: "focus:border-green-500",
          activeLink: "text-green-600",
        };
      case "dark":
        return {
          background: "bg-gray-900",
          border: "border-gray-700",
          title: "text-yellow-400",
          text: "text-gray-300",
          icon: "text-yellow-500 hover:text-yellow-400",
          button: "bg-yellow-600 hover:bg-yellow-700",
          input: "focus:border-yellow-500 bg-gray-800 border-gray-600",
          activeLink: "text-yellow-400",
        };
      default: // orange theme, now using #EA580C
        return {
          background: "bg-white",
          border: "border-gray-200",
          title: "text-[#44425A]",
          text: "text-[#6C6A74]",
          icon: "text-[#EA580C] hover:text-[#EA580C]",
          button: "bg-[#EA580C] hover:bg-[#EA580C]",
          input: "focus:border-[#EA580C]",
          activeLink: "text-[#EA580C]",
        };
    }
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const linkClass = (path) =>
    `hover:underline ${
      location.pathname === path
        ? `underline ${themeClasses.activeLink} font-semibold`
        : themeClasses.text
    }`;

  return (
    <footer
      className={`${themeClasses.background} border-t ${themeClasses.border} py-10 px-6 sm:px-10 lg:px-20 text-sm transition-colors duration-300`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Column - Branding */}
        <div>
          <h2 className={`${themeClasses.title} text-lg font-semibold mb-2`}>
            {t("footer.brand")}
          </h2>
          <p className={`${themeClasses.text} mb-4`}>
            {t("footer.description")}
          </p>
          <div className="flex gap-3">
            <a href="#" className={themeClasses.icon}>
              <FaFacebookF />
            </a>
            <a href="#" className={themeClasses.icon}>
              <FaYoutube />
            </a>
            <a href="#" className={themeClasses.icon}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Combined Quick Links + Resources for Small Screens */}
        <div className="block md:hidden flex justify-between gap-6">
          {/* Quick Links */}
          <div className="w-1/2">
            <h3 className={`${themeClasses.title} font-semibold mb-2`}>
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-1">
              <li>
                <NavLink to="/" className={() => linkClass("/")}>
                  {t("footer.links.home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course-details"
                  className={() => linkClass("/course-details")}
                >
                  {t("footer.links.courses")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/media-coverage"
                  className={() => linkClass("/media-coverage")}
                >
                  {t("footer.links.mediaCoverage")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={() => linkClass("/events")}>
                  {t("footer.links.events")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-1/2">
            <h3 className={`${themeClasses.title} font-semibold mb-2`}>
              {t("footer.resources")}
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className={`${themeClasses.text} hover:underline`}>
                  {t("footer.links.blog")}
                </a>
              </li>
              <li>
                <a href="#" className={`${themeClasses.text} hover:underline`}>
                  {t("footer.links.faqs")}
                </a>
              </li>
              <li>
                <a href="#" className={`${themeClasses.text} hover:underline`}>
                  {t("footer.links.support")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links for Medium+ (original position) */}
        <div className="hidden md:block">
          <h3 className={`${themeClasses.title} font-semibold mb-3`}>
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={() => linkClass("/")}>
                {t("footer.links.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/course-details"
                className={() => linkClass("/course-details")}
              >
                {t("footer.links.courses")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/media-coverage"
                className={() => linkClass("/media-coverage")}
              >
                {t("footer.links.mediaCoverage")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={() => linkClass("/events")}>
                {t("footer.links.events")}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Resources for Medium+ (original position) */}
        <div className="hidden md:block">
          <h3 className={`${themeClasses.title} font-semibold mb-3`}>
            {t("footer.resources")}
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className={`${themeClasses.text} hover:underline`}>
                {t("footer.links.blog")}
              </a>
            </li>
            <li>
              <a href="#" className={`${themeClasses.text} hover:underline`}>
                {t("footer.links.faqs")}
              </a>
            </li>
            <li>
              <a href="#" className={`${themeClasses.text} hover:underline`}>
                {t("footer.links.support")}
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className={`${themeClasses.title} font-semibold mb-3`}>
            {t("footer.subscribe")}
          </h3>
          <input
            type="email"
            placeholder={t("footer.emailPlaceholder")}
            className={`w-full px-3 py-2 border ${themeClasses.border} rounded ${themeClasses.text} mb-3 ${themeClasses.input} focus:outline-none`}
          />
          <button
            className={`w-full ${themeClasses.button} text-white font-semibold py-2 rounded transition`}
          >
            {t("footer.subscribeButton")}
          </button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={`mt-10 text-center ${themeClasses.text} text-xs`}>
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
