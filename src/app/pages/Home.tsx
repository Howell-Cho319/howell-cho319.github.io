import { Link } from "react-router";
import { ArrowRight, BookOpen, Briefcase, Award, Mail, FileText, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function Home() {
  const [showResume, setShowResume] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const resumePages = [
    "/images/resume/cv.png",
    "/images/resume/resume1.png",
    "/images/resume/resume2.png", 
    "/images/resume/resume3.png",
    "/images/resume/resume4.png",
    "/images/resume/resume5.png",
    "/images/resume/resume6.png",
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % resumePages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + resumePages.length) % resumePages.length);
  };
  const features = [
    {
      icon: BookOpen,
      title: "Personal Diary",
      description: "Thoughts, stories, and reflections from my daily journey",
      link: "/blog",
      color: "bg-accent/20",
    },
    {
      icon: Briefcase,
      title: "Professional Work",
      description: "Showcasing projects and creative endeavors",
      link: "/portfolio",
      color: "bg-chart-3/20",
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Certifications, education, and professional milestones",
      link: "/certifications",
      color: "bg-chart-5/20",
    },
    {
      icon: Mail,
      title: "Collaboration",
      description: "Let's work together on exciting projects",
      link: "/contact",
      color: "bg-chart-2/20",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to My
                <span className="block text-primary">Creative Space</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                A warm corner of the internet where I share my journey, work, and passion. 
                Discover my stories, explore my projects, and let's create something beautiful together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setShowResume(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/images/personal/howell6.jpeg"
                  alt="Howell Cho"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-3xl opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore What I Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From personal reflections to professional achievements, discover the different facets of my journey
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="block group h-full"
                >
                  <div className="h-full bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="images/materials/MyPersonalDiary.png"
                  alt="Personal Diary"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                My Personal Diary
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                A collection of thoughts, experiences, and lessons learned along the way. 
                Join me as I document my creative journey, share insights, and explore 
                new ideas in this ever-evolving digital space.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                Read My Stories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Academic & Professional Collaborations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Partnerships and collaborations that have shaped my academic and professional journey
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {/* Asia Pacific University */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="aspect-square bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src="/images/universities/apu.jpeg"
                  alt="Asia Pacific University"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">Asia Pacific University</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">Current Institution</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Pursuing Double Degree in Software Engineering. Currently serving as Team Mentor for competitions, hackathons, and projects, guiding student teams in technical development and innovation.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-primary">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active Collaboration
                </span>
              </div>
            </div>
          </motion.div>

          {/* De Montfort University */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="aspect-square bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src="/images/universities/dmu.png"
                  alt="De Montfort University"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">De Montfort University</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">UK Partner Institution</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Dual degree program partner providing international software engineering standards and practices. Gaining exposure to Western educational methodologies and global development approaches.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-primary">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active Collaboration
                </span>
              </div>
            </div>
          </motion.div>

          {/* TAR UMT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="aspect-square bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src="/images/universities/tarumt.png"
                  alt="TAR University of Management and Technology"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">TAR UMT</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">Previous Institution</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Completed Diploma in Information Technology with comprehensive programming and system analysis training. Served as Coursework Assignment Leader, coordinating project teams and ensuring academic excellence.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Completed (2023-2025)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Aonic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="aspect-square bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src="/images/universities/aonic.png"
                  alt="Aonic"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">Aonic</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">Industry Partner</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Completed Software (AI) Internship focusing on AI-driven computer vision solutions for automated oil palm tree detection. Contributed to end-to-end pipeline development and model optimization.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Completed (Oct 2024 - Jan 2025)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Monash University */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="aspect-square bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src="/images/universities/monash.webp"
                  alt="Monash University Malaysia"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">Monash University</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">Research Partner</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Served as Research Assistant supporting data preparation, machine learning workflows, and project documentation. Gained valuable experience in data analysis and academic research methodologies.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Completed (Feb 2025 - Dec 2025)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collaboration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Feel free to collaborate and explore more possibilities with me —{" "}
            <Link
              to="/contact#contact-form"
              className="text-primary hover:text-primary/80 transition-colors font-medium underline decoration-primary/30 hover:decoration-primary/60"
            >
              let's create something amazing together
            </Link>
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-chart-3 rounded-3xl p-8 md:p-12 text-center text-primary-foreground"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Create Together
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and creative projects. 
            Let's connect and make something amazing.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full hover:shadow-lg transition-shadow"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 bg-card/95 backdrop-blur border-b border-border">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">My Resume</h2>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {resumePages.length}
              </span>
            </div>
            <button
              onClick={() => setShowResume(false)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Screen Resume Content */}
          <div className="flex-1 relative bg-gray-100 overflow-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={resumePages[currentPage]}
                  alt={`Resume page ${currentPage + 1}`}
                  className="block max-w-full h-auto"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={resumePages.length <= 1}
              className="fixed left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg z-10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={nextPage}
              disabled={resumePages.length <= 1}
              className="fixed right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg z-10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="bg-card/95 backdrop-blur border-t border-border p-4">
            {/* Page Indicators */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {resumePages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPage
                      ? "bg-primary"
                      : "bg-muted hover:bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">
                Interested in working together?
              </p>
              <Link
                to="/contact"
                onClick={() => setShowResume(false)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
