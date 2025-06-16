// ayushii
// src/components/Blogs.jsx
"use client";

import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { publicClient } from "../sanity/config";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Clock, User, ArrowRight, Search, AlertCircle } from "lucide-react";

const Blogs = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();

  // pull categories & difficulties from translation file
  const categoryMap = t("blogs.categories", { returnObjects: true }) || {};
  const difficultyMap = t("blogs.difficulties", { returnObjects: true }) || {};

  const categories = Object.entries(categoryMap).map(([value, label]) => ({ value, label }));
  const difficulties = Object.entries(difficultyMap).map(([value, label]) => ({ value, label }));

  const getThemeClasses = () => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-light",
          surface: "bg-white",
          primary: "bg-blue-primary",
          text: "text-blue-text",
          accent: "text-blue-primary",
          button: "bg-blue-primary hover:bg-blue-600",
        };
      case "purple":
        return {
          background: "bg-purple-light",
          surface: "bg-white",
          primary: "bg-purple-primary",
          text: "text-purple-text",
          accent: "text-purple-primary",
          button: "bg-purple-primary hover:bg-purple-600",
        };
      case "green":
        return {
          background: "bg-green-light",
          surface: "bg-white",
          primary: "bg-green-primary",
          text: "text-green-text",
          accent: "text-green-primary",
          button: "bg-green-primary hover:bg-green-600",
        };
      case "dark":
        return {
          background: "bg-dark-light",
          surface: "bg-dark-dark",
          primary: "bg-dark-primary",
          text: "text-dark-text",
          accent: "text-dark-primary",
          button: "bg-dark-primary hover:bg-gray-700",
        };
      default:
        return {
          background: "bg-orange-50",
          surface: "bg-white",
          primary: "bg-orange-600",
          text: "text-gray-900",
          accent: "text-orange-600",
          button: "bg-orange-600 hover:bg-orange-700",
        };
    }
  };
  const themeClasses = getThemeClasses();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // filter logic
  const filterBlogs = useCallback(() => {
    let filtered = [...blogs];
    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }
    if (selectedDifficulty) {
      filtered = filtered.filter((b) => b.difficulty === selectedDifficulty);
    }
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, selectedDifficulty]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedCategory, selectedDifficulty, filterBlogs]);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const query = `*[_type == "blog"] | order(publishedAt desc) {
        _id, title, slug, author, publishedAt, excerpt,
        category, tags, difficulty, readTime, featured,
        "imageUrl": featuredImage.asset->url
      }`;
      const result = await publicClient.fetch(query);
      setBlogs(result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getCategoryLabel = (val) => categoryMap[val] || val;
  const getDifficultyColor = (d) => {
    switch (d) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" />
          <p className={themeClasses.text}>{t("blogs.loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeClasses.background} py-8 px-4`}>
        <div className="container mx-auto max-w-6xl">
          <Card className={`${themeClasses.surface} p-8 text-center`}>
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h1 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
              {t("blogs.errorTitle")}
            </h1>
            <p className={`${themeClasses.text} mb-6`}>{t("blogs.errorMessage")}</p>
            <div className="bg-gray-100 p-4 rounded-lg text-left mb-6">
              <p className="font-mono text-sm">Error: {error}</p>
            </div>
            <Button
              onClick={fetchBlogs}
              className={`${themeClasses.primary} text-white px-6 py-3 rounded-lg`}
            >
              {t("blogs.tryAgain")}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.background} py-8 px-4`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${themeClasses.text} mb-4`}>
            {t("blogs.title")}
          </h1>
          <p className={`text-xl ${themeClasses.text} opacity-70 max-w-3xl mx-auto`}>
            {t("blogs.subtitle")}
          </p>
        </div>

        {/* Search & Filters */}
        <Card className={`${themeClasses.surface} p-6 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={t("blogs.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t("blogs.categories.all")}</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t("blogs.difficulties.all")}</option>
              {difficulties.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedDifficulty("");
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {t("blogs.clearFilters")}
            </Button>
          </div>
        </Card>

        {/* Featured Posts */}
        {blogs.some((b) => b.featured) && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
              {t("blogs.featuredPosts")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs
                .filter((b) => b.featured)
                .slice(0, 2)
                .map((blog) => (
                  <Card
                    key={blog._id}
                    className={`${themeClasses.surface} overflow-hidden hover:shadow-lg transition-shadow`}
                  >
                    {blog.imageUrl && (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${themeClasses.primary} text-white`}
                        >
                          {getCategoryLabel(blog.category)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded text-white ${getDifficultyColor(
                            blog.difficulty
                          )}`}
                        >
                          {blog.difficulty}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-yellow-500 text-white">
                          {t("blogs.featuredPosts")}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                        {blog.title}
                      </h3>
                      <p className={`${themeClasses.text} opacity-70 mb-4`}>
                        {blog.excerpt}
                      </p>
                      <div
                        className={`flex items-center justify-between text-sm ${themeClasses.text} opacity-60`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {blog.readTime} min read
                          </span>
                        </div>
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
            {t("blogs.allPosts", { count: filteredBlogs.length })}
          </h2>
          {filteredBlogs.length === 0 ? (
            <Card className={`${themeClasses.surface} p-12 text-center`}>
              <p className={`${themeClasses.text} opacity-70 text-lg`}>
                {t("blogs.noPosts")}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card
                  key={blog._id}
                  className={`${themeClasses.surface} overflow-hidden hover:shadow-lg transition-shadow group`}
                >
                  {blog.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {blog.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="text-xs px-2 py-1 rounded bg-yellow-500 text-white">
                            {t("blogs.featuredPosts")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${themeClasses.primary} text-white`}
                      >
                        {getCategoryLabel(blog.category)}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded text-white ${getDifficultyColor(
                          blog.difficulty
                        )}`}
                      >
                        {blog.difficulty}
                      </span>
                    </div>
                    <h3
                      className={`text-lg font-bold ${
                        themeClasses.text
                      } mb-2 line-clamp-2`}
                    >
                      {blog.title}
                    </h3>
                    <p
                      className={`${themeClasses.text} opacity-70 mb-4 line-clamp-3`}
                    >
                      {blog.excerpt}
                    </p>
                    <div
                      className={`flex items-center justify-between text-sm ${themeClasses.text} opacity-60 mb-4`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {blog.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {blog.readTime} min
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${themeClasses.text} opacity-60`}
                      >
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                      <Button
                        className={`${themeClasses.button} text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2`}
                      >
                        {t("blogs.readMore")}
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <Card className={`${themeClasses.surface} p-8 text-center`}>
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
            {t("blogs.contributeTitle")}
          </h2>
          <p className={`${themeClasses.text} opacity-70 mb-6`}>
            {t("blogs.contributeText")}
          </p>
          <Button className={`${themeClasses.button} text-white px-8 py-3 rounded-lg transition-colors`}>
            {t("blogs.contributeButton")}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
