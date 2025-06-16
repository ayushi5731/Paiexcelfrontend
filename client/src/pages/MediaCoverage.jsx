// ayushiii
/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Eye, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const MediaCoverage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();

  // Define theme class mappings
  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-light themed-surface",
          text: "text-blue-text themed-text-secondary",
          title: "text-blue-primary themed-text-primary",
          accent: "text-blue-600",
          surface: "bg-blue-50",
          border: "border-blue-200",
          button:
            "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold",
          gradient: "bg-gradient-to-r from-blue-600 to-blue-400 text-white",
        };
      case "purple":
        return {
          background: "bg-purple-light themed-surface",
          text: "text-purple-text themed-text-secondary",
          title: "text-purple-primary themed-text-primary",
          accent: "text-purple-600",
          surface: "bg-purple-50",
          border: "border-purple-200",
          button:
            "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-semibold",
          gradient: "bg-gradient-to-r from-purple-600 to-purple-400 text-white",
        };
      case "green":
        return {
          background: "bg-green-light themed-surface",
          text: "text-green-text themed-text-secondary",
          title: "text-green-primary themed-text-primary",
          accent: "text-green-600",
          surface: "bg-green-50",
          border: "border-green-200",
          button:
            "bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold",
          gradient: "bg-gradient-to-r from-green-600 to-green-400 text-white",
        };
      case "dark":
        return {
          background: "bg-dark-light themed-surface",
          text: "text-gray-300 themed-text-secondary",
          title: "text-yellow-400 themed-text-primary",
          accent: "text-yellow-400",
          surface: "bg-gray-800",
          border: "border-gray-700",
          button:
            "bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500 text-gray-900 font-semibold",
          gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-gray-900",
        };
      default: // orange theme
        return {
          background: "bg-orange-50 themed-surface",
          text: "text-gray-700 themed-text-secondary",
          title: "text-orange-600 themed-text-primary",
          accent: "text-amber-600",
          surface: "bg-[#FFF7ED]",
          border: "border-orange-100",
          button:
            "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-500 text-white font-semibold",
          gradient: "bg-gradient-to-r from-orange-600 to-amber-600 text-white",
        };
    }
  };

  const themeClasses = getThemeClasses();

  const fblink = () => {
    window.open(
      "https://www.facebook.com/sgpcamritsar.org/videos/1361623474917124",
      "_blank"
    );
  };

  const podcastVideos = [
    {
      id: 1,
      title:
        "Everything AI: Don't fear from AI now, learn it with us | Dr. Sandeep Singh & Dr Inderjot Kaur ",
      channel: "Adbi Baithak",
      thumbnail: "https://www.youtube.com/embed/0MyPF_z9p6E",
      videoId: "0MyPF_z9p6E",
    },
    {
      id: 2,
      title:
        "America ਤੋਂ ਪਰਤਿਆ Sikh ਜੋੜਾ ਤੁਹਾਡੇ ਬੱਚਿਆਂ ਨੂੰ ਸਿਖਾਏਗਾ AI artificial intelligence course",
      channel: "Punjab Uncut tv",
      thumbnail: "https://www.youtube.com/embed/fbRuPGOFXTM",
      videoId: "fbRuPGOFXTM",
    },
    {
      id: 3,
      title: "I Phone ਅਤੇ Samsung ਫੋਨ ਵਿੱਚ AI ਟੈਕਨੋਲੋਜੀ ਦੇਣ ਵਾਲੇ ਸਰਦਾਰ ਜੀ",
      channel: "JSK Talks",
      thumbnail: "https://www.youtube.com/embed/DpIzIUyI634",
      videoId: "DpIzIUyI634",
    },
    {
      id: 4,
      title:
        "ਅਮਰੀਕਾ ਦੇ ਲੱਖਾਂ ਡਾਲਰ ਛੱਡ ਪੰਜਾਬ ਦੀ ਸੇਵਾ 'ਚ ਲੱਗਾ ਗੁਰਸਿੱਖ ਜੋੜਾ, SGPC ਵੱਲੋਂ ਸਵਾਗਤ",
      channel: "SGPC Sri Amritsar",
      thumbnail: "https://www.youtube.com/embed/74jvN3A94es",
      videoId: "74jvN3A94es",
    },
  ];

  const mediaArticles = [
    {
      id: 1,
      title: "Free AI Education for Sikh Students",
      source: "Shiromani Committee",
      date: "2024-01-15",
      excerpt:
        "Punjab AI Excellence launches comprehensive free AI education program for Sikh students worldwide...",
    },
    {
      id: 2,
      title: "Free AI Education for Sikh Students",
      source: "Shiromani Committee",
      date: "2024-01-10",
      excerpt:
        "Revolutionary initiative brings cutting-edge AI education to Sikh community at no cost...",
    },
    {
      id: 3,
      title: "Free AI Education for Sikh Students",
      source: "Shiromani Committee",
      date: "2024-01-08",
      excerpt:
        "Breaking barriers in technology education with focus on Sikh student empowerment...",
    },
    {
      id: 4,
      title: "Free AI Education for Sikh Students",
      source: "Shiromani Committee",
      date: "2024-01-05",
      excerpt:
        "Community-driven approach to AI education creates new opportunities for Sikh youth...",
    },
  ];

  const stats = t("mediaCoverage.stats", { returnObjects: true }) || [];

  return (
    <main
      className={`${themeClasses.background} ${themeClasses.text} font-sans transition-colors duration-300`}
    >
      {/* HERO Section */}
      <section className="relative w-full">
        <motion.div
          className="w-full h-[450px] bg-cover bg-center"
          style={{ backgroundImage: "url('/HomePage images.jpeg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
            <motion.h1
              className="text-4xl font-bold text-white text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t("mediaCoverage.podcastLibrary")} <br />
              <span className="text-xl font-light">
                {t("mediaCoverage.mediaAndPress")}
              </span>
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* PODCAST Section */}
      <section className={`py-16 px-4 sm:px-8 lg:px-16 ${themeClasses.surface}`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold ${themeClasses.title}`}>
              {t("mediaCoverage.podcastLibrary")}
            </h2>
            <div
              className={`w-32 h-1 ${themeClasses.gradient} mx-auto mt-4 rounded-full`}
            />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {podcastVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`${themeClasses.surface} ${themeClasses.border} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300`}
              >
                <iframe
                  src={video.thumbnail}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-48"
                />
                <div className="p-4">
                  <h3
                    className={`text-lg font-bold mb-2 line-clamp-2 ${themeClasses.title}`}
                  >
                    {video.title}
                  </h3>
                  <p className={`text-sm ${themeClasses.accent} mb-4`}>
                    {video.channel}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2 px-4 rounded-lg ${themeClasses.button}`}
                  >
                    {t("mediaCoverage.watchNow")}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS ARTICLES Section */}
      <section className={`py-16 px-4 sm:px-8 lg:px-16 ${themeClasses.surface}`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold ${themeClasses.title}`}>
              {t("mediaCoverage.mediaAndPress")}
            </h2>
            <div
              className={`w-32 h-1 ${themeClasses.gradient} mx-auto mt-4 rounded-full`}
            />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {mediaArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`${themeClasses.surface} ${themeClasses.border} rounded-2xl p-6 shadow-md hover:shadow-xl`}
              >
                <div
                  className={`flex justify-between text-sm mb-4 ${themeClasses.text}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 ${themeClasses.accent} rounded-full`} />
                    <span className="font-semibold">News by {article.source}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${themeClasses.title}`}>
                  {article.title}
                </h3>
                <p className="line-clamp-3 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1 ${themeClasses.accent} font-semibold`}
                  >
                    <Eye className="w-4 h-4" />
                    {t("mediaCoverage.viewMore")}
                  </motion.button>
                  <button onClick={fblink} className={`${themeClasses.accent} hover:${themeClasses.title}`}>
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl shadow-md ${themeClasses.button}`}
            >
              {t("mediaCoverage.loadMore")}
            </motion.button>
          </div>
        </div>
      </section>

      {/* STATS Section */}
      <section className={`${themeClasses.gradient} py-12 px-16`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MediaCoverage;
