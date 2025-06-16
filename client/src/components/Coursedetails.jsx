// ayushiii
// src/components/CourseDetail.jsx
"use client";
import React, { useState } from "react";
import { FaUser, FaClock, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

export default function CourseDetail() {
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
            "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500 text-gray-900 font-semibold",
          gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-gray-900",
        };
      default:
        return {
          background: "bg-orange-50 themed-surface",
          text: "text-gray-700 themed-text-secondary",
          title: "text-orange-600 themed-text-primary",
          accent: "text-amber-600",
          surface: "bg-white",
          border: "border-orange-100",
          button:
            "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-500 text-white font-semibold",
          gradient: "bg-gradient-to-r from-orange-600 to-amber-600 text-white",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Fetch course arrays from translation JSON
  const topCourses = t("courseDetail.courses.top", { returnObjects: true }) || [];
  const moreCourses = t("courseDetail.courses.more", { returnObjects: true }) || [];

  // Modal state
  const [modalCourse, setModalCourse] = useState(null);
  const openModal = (course) => setModalCourse(course);
  const closeModal = () => setModalCourse(null);

  // Video URLs
  const practicalUrls = [
    "https://www.youtube.com/embed/gLw_F4s_Whw?si=A1lGsItzue5yrfQL",
    "https://www.youtube.com/embed/k2qdlSCSmjU?si=4cIHSFVKLtnfbApZ",
    "https://www.youtube.com/embed/J_4KyEsLIZA?si=IWavCZMoI3irpHdA",
  ];
  const moreUrls = [
    "https://www.youtube.com/embed/JIKf55ZBPes?si=abnWW8xImv9KKDuH",
    "https://www.youtube.com/embed/W_8WGop5TbY?si=JM7arSyWcXnWH2JS",
    "https://www.youtube.com/embed/9iJ9NNXyX_w?si=o8_QHbnvlEFNXAob",
    "https://www.youtube.com/embed/P5orV_pI5lE?si=rfbHLZv7DIiOTVR6",
    "https://www.youtube.com/embed/7lhDG5VHc40?si=73RtseogTLALDyk8",
    "https://www.youtube.com/embed/ha3DMREmM2Y?si=QMMUJQADQ-HWAmki",
    "https://www.youtube.com/embed/gLw_F4s_Whw?si=UKOdL-k7Lrmee0B0",
    "https://www.youtube.com/embed/k2qdlSCSmjU?si=04K0C0BFN_EQO6h9",
    "https://www.youtube.com/embed/k2qdlSCSmjU?si=04K0C0BFN_EQO6h9",
  ];

  const handleWatchNowTop = (idx) => {
    window.location.href = practicalUrls[idx] || practicalUrls[0];
  };
  const handleWatchNowMore = (idx) => {
    window.location.href = moreUrls[idx] || moreUrls[0];
  };

  // Explore more toggle
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? moreCourses : moreCourses.slice(0, 6);

  // Contact form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setFormStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className={`${themeClasses.background} ${themeClasses.text} min-h-screen font-sans transition-colors duration-300`}>
      {/* Hero Section with Ken Burns background */}
      <section className="relative h-[360px] flex items-center justify-start px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{ backgroundImage: "url('/Hero.png')" }}
        />
        <div className="relative z-10 w-full lg:w-1/2 text-left text-white">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${themeClasses.title}`}>
            {t("courseDetail.heroTitle")}
          </h2>
          <p className="max-w-md text-lg opacity-90">{t("courseDetail.heroSubtitle")}</p>
        </div>
      </section>

      {/* Top 3 Practical AI Course Recordings */}
      <section className="container mx-auto px-6 lg:px-20 py-12">
        <h3 className={`text-2xl font-semibold mb-6 ${themeClasses.title}`}>
          {t("courseDetail.practicalAI")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCourses.map(({ classLabel, title, description }, idx) => (
            <div
              key={idx}
              className="hover:shadow-lg transition-[50%] cursor-pointer bg-white border border-gray-300 rounded-[20px] flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-grow">
                <span className="inline-block text-xs text-[#6C6A74] bg-[#EBEAEF] px-3 py-1 rounded-full mb-4">
                  {classLabel}
                </span>
                <h4 className={`text-lg font-bold mb-2 ${themeClasses.title}`}>{title}</h4>
                <p className="text-sm text-[#6C6A74] leading-relaxed">{description}</p>
              </div>
              <button
                onClick={() => handleWatchNowTop(idx)}
                className={`mx-4 mb-4 py-3 ${themeClasses.button} text-white font-semibold rounded-full hover:brightness-90 transition`}
              >
                {t("courseDetail.watchNow")} &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* More Courses Grid */}
      <section className="container mx-auto px-6 lg:px-20 py-12 rounded-t-3xl">
        <h3 className={`text-2xl font-semibold mb-6 ${themeClasses.title}`}>
          {t("courseDetail.moreCourses")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 rounded-[20px] overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => openModal(course)}
            >
              <div className="overflow-hidden">
                <img
                  src={course.img || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-40 object-cover animate-kenburns"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm text-[#6C6A74] mb-2 space-x-2">
                  <FaUser className="text-[#FF6600]" />
                  <span>{course.students}</span>
                  <FaClock className="ml-4 text-[#FF6600]" />
                  <span>{course.duration}</span>
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${themeClasses.title}`}>{course.title}</h4>
                <hr className="border-gray-200 mb-2" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-[#FF6600]" />
                    <span className="text-sm text-[#6C6A74]">{course.rating}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWatchNowMore(idx);
                    }}
                    className={`bg-[#FF6600] text-white ${themeClasses.button} text-sm font-semibold rounded-full px-3 py-1 hover:brightness-90 transition`}
                  >
                    {t("courseDetail.watchNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More/Less Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`px-6 py-3 bg-[#FF6600] ${themeClasses.button} text-white rounded-full font-semibold hover:brightness-90 transition`}
          >
            {showAll ? t("courseDetail.exploreLess") : t("courseDetail.exploreMore")}
          </button>
        </div>

        {/* Modal Dialog */}
        {modalCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                aria-label="close modal"
              >
                &times;
              </button>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.title}`}>
                About the module: {modalCourse.title}
              </h3>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>Date of Session:</strong> {modalCourse.date}
              </p>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>Instructor:</strong> Dr. Sandeep Singh Sandha (UCLA, IIT Roorkee). {modalCourse.instructor}
              </p>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>Key Takeaways: </strong> Real-world AI use in healthcare, agriculture, and wildlife. Hands-on projects using Python.{modalCourse.takeaways}
              </p>
              <p className="text-sm text-[#6C6A74] mb-4">
                <strong>Who joined:</strong> Students from 200+ cities, ready to lead the AI revolution. {modalCourse.joinees}
              </p>
              <button
                onClick={() => handleWatchNowTop(0)}
                className={`w-full py-2 ${themeClasses.button} text-white font-semibold rounded-full hover:brightness-90 transition`}
              >
                Watch Now &rarr;
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Contact Form Section */}
      <section className={`${themeClasses.surface} container mx-auto px-6 lg:px-20 pt-12 pb-12`}>
        <h3 className={`text-2xl font-semibold mb-2 text-center ${themeClasses.title}`}>
          {t("courseDetail.contactForm.title")}
        </h3>
        <p className="text-center text-sm mb-6 text-[#6C6A74]">
          {t("courseDetail.contactForm.subtitle")}
        </p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            placeholder={t("courseDetail.contactForm.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-full focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
          />
          <input
            type="email"
            placeholder={t("courseDetail.contactForm.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-full focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
          />
          <textarea
            rows="4"
            placeholder={t("courseDetail.contactForm.queryPlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-[20px] focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
          />
          <button
            type="submit"
            className={`w-full px-4 py-3 ${themeClasses.button} rounded-full bg-[#FF6600] text-white font-semibold hover:brightness-90 transition`}
          >
            {t("courseDetail.contactForm.submit")}
          </button>
          {formStatus === "success" && (
            <p className="text-green-600 text-center font-medium pt-2">
              {t("courseDetail.contactForm.success")}
            </p>
          )}
          {formStatus === "error" && (
            <p className="text-red-600 text-center font-medium pt-2">
              {t("courseDetail.contactForm.error")}
            </p>
          )}
        </form>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 lg:px-20 py-12">
        <h3 className={`text-3xl font-semibold text-center ${themeClasses.title} mb-8`}>
          {t("courseDetail.testimonials.title")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alice Johnson", text: "This course completely transformed my understanding of AI. The hands-on projects were invaluable!" },
            { name: "Michael Lee", text: "The instructors explained complex concepts in an easy-to-understand manner. Highly recommend!" },
            { name: "Priya Singh", text: "I landed my dream job in tech after applying the skills I learned here. Truly grateful!" }
          ].map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="h-32 w-32 mb-4">
                <img
                  src={`/Images/student${index + 1}.png`}
                  alt={`${testimonial.name} photo`}
                  className="h-full w-full object-cover rounded-full transform transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <p className="text-[#6C6A74] text-sm italic">
                <span className="text-[#FF6600]">"</span>
                {testimonial.text}
                <span className="text-[#FF6600]">"</span>
              </p>
              <h5 className="mt-3 font-medium text-[#6C6A74]">{testimonial.name}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* Ken Burns animation keyframes */}
      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0,0); }
          50% { transform: scale(1.1) translate(-5%, -5%); }
          100% { transform: scale(1) translate(0,0); }
        }
        .animate-kenburns {
          animation: kenburns 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
