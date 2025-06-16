// ayushiiii
// src/components/BatchesSection.jsx
"use client";

import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/Dialog";
import { useTheme } from "../contexts/ThemeContext";

const BatchesSection = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { currentTheme } = useTheme();

  // Use the same orange→amber gradient for every button, regardless of theme
  const gradientBtn =
    "bg-gradient-to-r from-orange-600 to-amber-600 " +
    "hover:from-orange-700 hover:to-amber-500 " +
    "text-white font-semibold";

  const themeClasses = (() => {
    switch (currentTheme) {
      case "blue":
        return {
          background: "bg-blue-light themed-surface",
          border: "border-blue-200",
          title: "text-blue-primary themed-text-primary",
          text: "text-blue-text themed-text-secondary",
          card: "bg-blue-50",
          button: gradientBtn,
        };
      case "purple":
        return {
          background: "bg-purple-light themed-surface",
          border: "border-purple-200",
          title: "text-purple-primary themed-text-primary",
          text: "text-purple-text themed-text-secondary",
          card: "bg-purple-50",
          button: gradientBtn,
        };
      case "green":
        return {
          background: "bg-green-light themed-surface",
          border: "border-green-200",
          title: "text-green-primary themed-text-primary",
          text: "text-green-text themed-text-secondary",
          card: "bg-green-50",
          button: gradientBtn,
        };
      case "dark":
        return {
          background: "bg-dark-light themed-surface",
          border: "border-gray-700",
          title: "text-dark-primary themed-text-primary",
          text: "text-dark-text themed-text-secondary",
          card: "bg-gray-800",
          button: gradientBtn,
        };
      default:
        return {
          background: "bg-white themed-surface",
          border: "border-orange-200",
          title: "text-orange-600 themed-text-primary",
          text: "text-gray-900 themed-text-secondary",
          card: "bg-white",
          button: gradientBtn,
        };
    }
  })();

  // New Batches Data
  const newBatchesData = [
    {
      id: 1,
      type: "batch",
      title: t("batches.newBatch.title"),
      description: t("batches.newBatch.description"),
      date: t("batches.newBatch.date"),
      time: "",
      icon: <Calendar size={18} aria-label="calendar icon" />,
      ctaText: t("batches.newBatch.register", "Register Now"),
    },
    {
      id: 4,
      type: "batch",
      title: t("batches.newBatchPractical.title", "Practical AI Course"),
      description: t(
        "batches.newBatchPractical.description",
        "Hands-on sessions covering Python and ML basics. Duration: 10 weeks, weekends only."
      ),
      date: t("batches.newBatchPractical.date", "Starts 26 April 2025"),
      time: "",
      icon: <Calendar size={18} aria-label="calendar icon" />,
      ctaText: t("batches.newBatch.register", "Register Now"),
    },
    {
      id: 5,
      type: "batch",
      title: t("batches.newBatchIntern.title", "Internship/Projects Batch"),
      description: t(
        "batches.newBatchIntern.description",
        "Work on real-world AI projects under mentor guidance. Duration: 6 weeks, limited seats."
      ),
      date: t("batches.newBatchIntern.date", "Open for Registration"),
      time: "",
      icon: <Calendar size={18} aria-label="calendar icon" />,
      ctaText: t("batches.newBatch.register", "Register Now"),
    },
  ];

  // Live Classes Data
  const liveClassesData = [
    {
      id: 2,
      type: "class",
      title: t("batches.liveClass.title"),
      description: t("batches.liveClass.description"),
      date: t("batches.liveClass.time").split(",")[1].trim(),
      time: t("batches.liveClass.time").split(",")[0].trim(),
      icon: <Clock size={18} aria-label="clock icon" />,
      ctaText: t("batches.liveClass.register"),
      image: "/Images/batches1.png",
    },
    {
      id: 3,
      type: "class",
      title: t("batches.DataAnalysisClass.title"),
      description: t("batches.DataAnalysisClass.description"),
      date: t("batches.DataAnalysisClass.startDate"),
      time: t("batches.DataAnalysisClass.time"),
      icon: <Clock size={18} aria-label="clock icon" />,
      ctaText: t("batches.DataAnalysisClass.register", {
        defaultValue: t("batches.liveClass.register"),
      }),
      image: "/Images/batches2.png",
    },
  ];

  const handleCardAction = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  function BatchCard({ data, onAction }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: (data.id % 2) * 0.2 + 0.1,
          type: "spring",
          stiffness: 120,
        }}
        tabIndex={0}
        aria-label={data.title}
        role="listitem"
        className="flex flex-col h-full justify-between outline-none focus-visible:ring-2 focus-visible:ring-primary group transition-all"
      >
        <Card
          className={`flex flex-col h-full group/card hover:shadow-xl hover:scale-[1.02] transition-all ${themeClasses.border} ${themeClasses.card}`}
        >
          <CardHeader>
            <CardTitle
              className={`text-lg sm:text-base font-semibold flex items-center gap-2 ${themeClasses.title} tracking-wide`}
            >
              {data.icon}
              <span>{data.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between p-4 sm:p-6">
            {data.type === "class" && data.image && (
              <div className="w-full h-24 sm:h-32 mb-4">
                <img
                  src={data.image}
                  alt={`${data.title} placeholder`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <div>
              <p className={`mb-3 sm:mb-4 text-sm sm:text-base ${themeClasses.text}`}>
                {data.description}
              </p>
              <div
                className={`flex items-center gap-2 text-xs sm:text-sm ${themeClasses.text} mb-3 sm:mb-4 whitespace-nowrap`}
              >
                {data.time && (
                  <>
                    <Clock size={14} aria-label="Class time" />
                    <span>{data.time}</span>
                    <span className="mx-1">|</span>
                  </>
                )}
                {data.date && (
                  <>
                    <Calendar size={14} aria-label="Class date" />
                    <span>{data.date}</span>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="default"
              className={`w-full mt-auto text-sm sm:text-base ${themeClasses.button}`}
              aria-label={`${data.ctaText} for ${data.title}`}
              onClick={() => onAction(data)}
            >
              {data.ctaText}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  function BatchModal({ open, onOpenChange, modalData }) {
    if (!modalData) return null;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMsg("");
      setSuccessMsg("");
      setIsSubmitting(true);

      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            course: modalData.title,
            name,
            email,
            phone,
          }),
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Failed to register");
        }
        setSuccessMsg(t("batches.modal.success", "Student successfully registered! 🎉"));
        setName("");
        setEmail("");
        setPhone("");
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || t("batches.modal.error", "Server error"));
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          aria-modal="true"
          className="w-full max-w-md mx-auto px-4 sm:px-6 focus:outline-none"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle
              tabIndex={0}
              className={`text-lg sm:text-xl font-semibold ${themeClasses.title}`}
            >
              {t("batches.modal.enrolling", "Enrolling for")} {modalData.title}
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:opacity-75 focus:outline-none"
              aria-label={t("batches.modal.close", "Close enrollment form")}
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-sm text-green-600">{successMsg}</div>}
            <div>
              <label className="block mb-1 font-medium text-sm">
                {t("batches.modal.nameLabel", "Name")}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t("batches.modal.namePlaceholder", "Your full name")}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                {t("batches.modal.emailLabel", "Email")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t("batches.modal.emailPlaceholder", "you@example.com")}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                {t("batches.modal.phoneLabel", "Phone (optional)")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t("batches.modal.phonePlaceholder", "123-456-7890")}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-sm sm:text-base ${themeClasses.button}`}
              >
                {isSubmitting
                  ? t("batches.modal.submitting", "Submitting…")
                  : t("batches.modal.submit", "Submit")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <section
      className={`${themeClasses.background} py-12 px-4 md:px-8 lg:px-16 transition-colors duration-300`}
      aria-labelledby="batches-section-title"
    >
      <div className="container mx-auto space-y-16">
        {/* New Batches */}
        <div>
          <motion.h2
            id="new-batches-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className={`text-2xl sm:text-3xl font-bold mb-8 ${themeClasses.title}`}
            tabIndex={0}
          >
            {t("batchesSection.newBatchesHeading")}
          </motion.h2>
          <div role="list" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {newBatchesData.map((batch) => (
              <BatchCard key={batch.id} data={batch} onAction={handleCardAction} />
            ))}
          </div>
        </div>

        {/* Live Classes */}
        <div>
          <motion.h2
            id="live-classes-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className={`text-2xl sm:text-3xl font-bold mb-8 ${themeClasses.title}`}
            tabIndex={0}
          >
            {t("batchesSection.liveClassesHeading")}
          </motion.h2>
          <div role="list" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {liveClassesData.map((batch) => (
              <BatchCard key={batch.id} data={batch} onAction={handleCardAction} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <BatchModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            modalData={modalData}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BatchesSection;
