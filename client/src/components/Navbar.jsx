// ayushiiii
"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import LanguageToggle from "./LanguageToggle";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { currentTheme } = useTheme();
  const themeSwitcherRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (themeSwitcherRef.current && !themeSwitcherRef.current.contains(event.target)) {
        setShowThemeSwitcher(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeSwitcherRef]);

  const navItems = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.courseDetails"), href: "/course-details" },
    { name: t("navbar.mediaCoverage"), href: "/media-coverage" },
    { name: t("navbar.blogs"), href: "/blogs" },
    { name: t("navbar.events"), href: "/events" },
  ];

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          surface: "bg-white",
          logo: "text-blue-primary",
          text: "text-blue-text",
          border: "border-blue-primary",
          button: "bg-blue-50 border-blue-200 hover:bg-blue-100",
        };
      case "purple":
        return {
          surface: "bg-white",
          logo: "text-purple-primary",
          text: "text-purple-text",
          border: "border-purple-primary",
          button: "bg-purple-50 border-purple-200 hover:bg-purple-100",
        };
      case "green":
        return {
          surface: "bg-white",
          logo: "text-green-primary",
          text: "text-green-text",
          border: "border-green-primary",
          button: "bg-green-50 border-green-200 hover:bg-green-100",
        };
      case "dark":
        return {
          surface: "bg-dark-light",
          logo: "text-dark-primary",
          text: "text-dark-text",
          border: "border-dark-primary",
          button: "bg-dark-dark border-gray-600 hover:bg-gray-800",
        };
      default:
        return {
          surface: "bg-white",
          logo: "text-orange-600",
          text: "text-gray-700",
          border: "border-orange-500",
          button: "bg-orange-50 border-orange-200 hover:bg-orange-100",
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <>
      <nav
        className={`${themeClasses.surface} shadow-sm py-7 px-4 md:px-16 sticky top-0 z-50 transition-colors duration-300 themed-surface`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="/"
            className={`text-4xl font-bold ${themeClasses.logo} themed-text-primary transition-colors duration-300`}
          >
            P<b>AI</b> Excel
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${themeClasses.text} transition-all duration-200 pb-1 themed-text-secondary ${
                  location.pathname === item.href
                    ? `font-bold border-b-4 ${themeClasses.border}`
                    : `hover:font-bold hover:border-b-4 hover:${themeClasses.border}`
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowThemeSwitcher(!showThemeSwitcher);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold text-sm shadow-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeClasses.button} ${themeClasses.text}`}
              aria-label="Toggle theme switcher"
            >
              🎨 <span className="hidden sm:inline">Themes</span>
            </button>
            <LanguageToggle />
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${themeClasses.text} themed-text-secondary`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {showThemeSwitcher && (
          <div className="absolute top-full right-4 md:right-16 mt-2 z-50" ref={themeSwitcherRef}>
            <ThemeSwitcher />
          </div>
        )}

        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-20 left-0 right-0 ${themeClasses.surface} shadow-md py-4 px-6 z-50 themed-surface`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${themeClasses.text} transition-all duration-200 pb-1 themed-text-secondary ${
                    location.pathname === item.href
                      ? `font-bold border-b-4 ${themeClasses.border}`
                      : `hover:font-bold hover:border-b-4 hover:${themeClasses.border}`
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <ThemeSwitcher />
              </div>
              <div className="pt-4 border-t border-gray-200">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
