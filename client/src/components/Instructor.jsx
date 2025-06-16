// ayushiiii
"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Cpu,
  Brain,
  Code,
  Building,
  GraduationCap,
  BookOpen,
  Award,
  Lightbulb,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const Instructor = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();

  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-light themed-surface",
          border: "border-blue-200",
          title: "text-blue-primary themed-text-primary",
          text: "text-blue-text themed-text-secondary",
          card: "bg-blue-50",
          iconBg: "bg-blue-100",
          line: "bg-blue-400",
          ctaBg: "from-blue-600 to-blue-500",
          ctaText: "text-blue-100",
          ctaButton: "bg-white text-blue-600 hover:bg-blue-100",
        };
      case "purple":
        return {
          background: "bg-purple-light themed-surface",
          border: "border-purple-200",
          title: "text-purple-primary themed-text-primary",
          text: "text-purple-text themed-text-secondary",
          card: "bg-purple-50",
          iconBg: "bg-purple-100",
          line: "bg-purple-400",
          ctaBg: "from-purple-400 to-purple-500",
          ctaText: "text-purple-100",
          ctaButton: "bg-white text-purple-400 hover:bg-purple-50",
        };
      case "green":
        return {
          background: "bg-green-light themed-surface",
          border: "border-green-200",
          title: "text-green-primary themed-text-primary",
          text: "text-green-text themed-text-secondary",
          card: "bg-green-50",
          iconBg: "bg-green-100",
          line: "bg-green-400",
          ctaBg: "from-green-600 to-green-500",
          ctaText: "text-green-100",
          ctaButton: "bg-white text-green-600 hover:bg-green-100",
        };
      case "dark":
        return {
          background: "bg-dark-light themed-surface",
          border: "border-gray-700",
          title: "text-yellow-400 themed-text-primary",
          text: "text-gray-200 themed-text-secondary",
          card: "bg-gray-800",
          iconBg: "bg-gray-700",
          line: "bg-yellow-500",
          ctaBg: "from-yellow-600 to-yellow-500",
          ctaText: "text-yellow-100",
          ctaButton: "bg-white text-yellow-600 hover:bg-yellow-50",
        };
      default:
        return {
          background: "bg-orange-50 themed-surface",
          border: "border-orange-100",
          title: "text-orange-600 themed-text-primary",
          text: "text-gray-900 themed-text-secondary",
          card: "bg-white",
          iconBg: "bg-orange-100",
          line: "bg-orange-300",
          ctaBg: "from-orange-600 to-amber-600",
          ctaText: "text-orange-100",
          ctaButton: "bg-white text-orange-600 hover:bg-orange-50",
        };
    }
  };

  const themeClasses = getThemeClasses();

  const expertisePoints = t("instructor.expertise.points", { returnObjects: true }) || [];
  const teachingPoints = t("instructor.teaching.points", { returnObjects: true }) || [];
  const expertiseIcons = [FileText, Award, Cpu, Brain, Building];
  const teachingIcons = [Code, GraduationCap, Users, BookOpen, Lightbulb];

  return (
    <section className={`py-16 px-4 md:px-16 ${themeClasses.background} transition-colors duration-300`}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${themeClasses.title}`}>
            {t("instructor.title")}
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${themeClasses.line}`}></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-12">
          {/* Left – Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div
                className={`w-64 h-64 rounded-full overflow-hidden border-4 ${themeClasses.line} shadow-2xl bg-white p-2`}
              >
                <img
                  src="/Images/instructor.png"
                  alt={t("instructor.name")}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* badge removed */}
            </div>

            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-2 ${themeClasses.text}`}>
                {t("instructor.name")}
              </h3>
              <p className={`${themeClasses.title} font-semibold text-lg`}>
                {t("instructor.position")}
              </p>
            </div>
          </motion.div>

          {/* Right – Bio + Mission Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className={`${themeClasses.card} p-8 rounded-2xl shadow-lg ${themeClasses.border}`}>
              <p className={`${themeClasses.text} leading-relaxed text-lg mb-6`}>
                {t("instructor.description")}
              </p>

              {/* Mission Highlight */}
              <div className="relative mb-6">
                <div className="bg-orange-50 border border-orange-300 p-4 rounded-lg">
                  <p className="text-orange-600 font-semibold text-lg">
                    {t("instructor.subtitle")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expertise & Teaching Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className={`${themeClasses.card} p-8 rounded-2xl shadow-lg ${themeClasses.border}`}
          >
            <div className="flex items-center mb-6">
              <div className={`${themeClasses.iconBg} p-3 rounded-xl mr-4`}>
                <Brain className={`w-7 h-7 ${themeClasses.line}`} />
              </div>
              <h4 className={`text-xl font-bold ${themeClasses.text}`}>
                {t("instructor.expertise.title")}
              </h4>
            </div>
            <div className="space-y-4">
              {expertisePoints.map((point, index) => {
                const IconComponent = expertiseIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start group hover:${themeClasses.iconBg} p-3 rounded-lg transition-all duration-300`}
                  >
                    <div
                      className={`${themeClasses.iconBg} p-2 rounded-lg mr-4 group-hover:bg-opacity-75 transition-all duration-300`}
                    >
                      <IconComponent className={`w-5 h-5 ${themeClasses.line}`} />
                    </div>
                    <p
                      className={`${themeClasses.text} leading-relaxed text-sm group-hover:${themeClasses.title} transition-colors duration-300`}
                    >
                      {point}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Teaching */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className={`${themeClasses.card} p-8 rounded-2xl shadow-lg ${themeClasses.border}`}
          >
            <div className="flex items-center mb-6">
              <div className={`${themeClasses.iconBg} p-3 rounded-xl mr-4`}>
                <GraduationCap className={`w-7 h-7 ${themeClasses.line}`} />
              </div>
              <h4 className={`text-xl font-bold ${themeClasses.text}`}>
                {t("instructor.teaching.title")}
              </h4>
            </div>
            <div className="space-y-4">
              {teachingPoints.map((point, index) => {
                const IconComponent = teachingIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start group hover:${themeClasses.iconBg} p-3 rounded-lg transition-all duration-300`}
                  >
                    <div
                      className={`${themeClasses.iconBg} p-2 rounded-lg mr-4 group-hover:bg-opacity-75 transition-all duration-300`}
                    >
                      <IconComponent className={`w-5 h-5 ${themeClasses.line}`} />
                    </div>
                    <p
                      className={`${themeClasses.text} leading-relaxed text-sm group-hover:${themeClasses.title} transition-colors duration-300`}
                    >
                      {point}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className={`bg-gradient-to-r ${themeClasses.ctaBg} rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl`}>
            <h3 className="text-2xl font-bold mb-4 text-white">
              {t("instructor.cta.title")}
            </h3>
            <p className={`${themeClasses.ctaText} mb-6 text-lg`}>
              {t("instructor.cta.description")}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${themeClasses.ctaButton} px-8 py-3 rounded-lg font-bold transition duration-300 shadow-lg`}
            >
              {t("instructor.cta.button")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Instructor;


