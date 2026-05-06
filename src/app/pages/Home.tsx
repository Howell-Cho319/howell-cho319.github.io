import { Link } from "react-router";
import { ArrowRight, BookOpen, Briefcase, Award, Mail, FileText, X, ChevronLeft, ChevronRight, Clock, Volume2, ListChecks, CheckSquare, BarChart2, Info, Play, Smartphone, FlipHorizontal, Layers, Keyboard, Gamepad2, Heart, Calculator, PieChart, RotateCcw, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect, useMemo } from "react";

function FocusFlowTutorialModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  
  const TUTORIAL_STEPS = [
    {
      icon: Clock,
      color: 'text-white',
      bg: 'bg-amber-800',
      title: 'Timer',
      steps: [
        'Pick a preset (Pomodoro, Deep Work…) or set a custom duration.',
        'Press ▶ to start. The ring fills as time passes.',
        'Use ↺ to reset or ⏭ to skip to break.',
        'Select a Habit below the presets to track specific activities.',
      ],
    },
    {
      icon: Volume2,
      color: 'text-white',
      bg: 'bg-amber-800',
      title: 'Ambient Sound',
      steps: [
        'Tap any sound tile to activate it — multiple sounds can play together.',
        'A volume slider appears for each active sound.',
        'Toggle the SOUND button to mute/unmute all at once.',
        'Sounds only play while the timer is running.',
      ],
    },
    {
      icon: ListChecks,
      color: 'text-white',
      bg: 'bg-amber-800',
      title: 'Habits',
      steps: [
        'Add habits with a name, icon, color, duration and type (Focus/Break).',
        'Press ▶ on a habit card to start that habit\'s timer immediately.',
        'Toggle habits on/off in the "All Habits" row at the bottom.',
        'Today\'s progress bar shows how many minutes you\'ve spent on each habit.',
      ],
    },
    {
      icon: CheckSquare,
      color: 'text-white',
      bg: 'bg-amber-800',
      title: 'Plan',
      steps: [
        'Add tasks for today with a title, time, duration and color.',
        'Tap the circle ○ on a task to mark it done.',
        'Progress bar at the top shows how many tasks are completed.',
        'Plans reset each day — start fresh every morning.',
      ],
    },
    {
      icon: BarChart2,
      color: 'text-white',
      bg: 'bg-amber-800',
      title: 'Today',
      steps: [
        'Score card shows your daily focus score (0–100) based on minutes, sessions and challenges.',
        'Minutes / Sessions / Streak update automatically as you complete timers.',
        'This Week bar chart shows your daily focus minutes for the past 7 days.',
        'Complete all 4 daily challenges to earn bonus points.',
      ],
    },
  ];

  const current = TUTORIAL_STEPS[step];
  const Icon = current.icon;
  const isLast = step === TUTORIAL_STEPS.length - 1;

  const nextStep = () => setStep(s => Math.min(TUTORIAL_STEPS.length - 1, s + 1));
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  return (
    <div
      className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
      style={{ backgroundColor: '#f5f1eb' }}
      onClick={e => e.stopPropagation()}
    >
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>

      {/* Navigation Arrows */}
      {step > 0 && (
        <button
          onClick={prevStep}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
      
      {step < TUTORIAL_STEPS.length - 1 && (
        <button
          onClick={nextStep}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Content */}
      <div className="p-8">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl ${current.bg} flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${current.color}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-1">{current.title}</h2>
            <p className="text-sm text-amber-700">Step {step + 1} of {TUTORIAL_STEPS.length}</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {current.steps.map((stepText, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: '#ede7dc' }}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-800 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-amber-900 leading-relaxed">{stepText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-8 py-4 flex items-center justify-between" style={{ backgroundColor: '#ede7dc' }}>
        {/* Step Indicators */}
        <div className="flex gap-2">
          {TUTORIAL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? 'bg-amber-800' : i < step ? 'bg-amber-600' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        {isLast ? (
          <Link
            to="/focusflow"
            onClick={onClose}
            className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-full font-medium transition-colors"
          >
            Start Using FocusFlow
          </Link>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-full font-medium transition-colors"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}

export function Home() {
  const [showResume, setShowResume] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFocusFlowTutorial, setShowFocusFlowTutorial] = useState(false);
  const [activeGameSlide, setActiveGameSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Memoize stars to prevent re-randomization on every render (which happens every 8s due to slider)
  const stars = useMemo(() => {
    return {
      slow: [...Array(40)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 3}s`
      })),
      medium: [...Array(25)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${3 + Math.random() * 4}s`
      })),
      fast: [...Array(12)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${4 + Math.random() * 5}s`
      }))
    };
  }, []);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-slide for games
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGameSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

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
      <style>{`
        @keyframes star-move-slow {
          from { transform: translateY(0); }
          to { transform: translateY(-100px); }
        }
        @keyframes star-move-medium {
          from { transform: translateY(0); }
          to { transform: translateY(-200px); }
        }
        @keyframes star-move-fast {
          from { transform: translateY(0); }
          to { transform: translateY(-300px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-star-move-slow {
          animation: star-move-slow 20s linear infinite alternate;
        }
        .animate-star-move-medium {
          animation: star-move-medium 15s linear infinite alternate;
        }
        .animate-star-move-fast {
          animation: star-move-fast 10s linear infinite alternate;
        }
      `}</style>
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
                <br />
                <span className="text-sm mt-4 block">Website Design and Created By Cho Sin Hong</span>
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

      {/* FocusFlow Introduction Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5">
                <Clock className="w-4 h-4" />
                Study Tool
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Focus & Learn
                <span className="block text-primary">Grow Faster</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Boost your productivity with FocusFlow - a comprehensive study companion featuring 
                Pomodoro timers, ambient sounds, habit tracking, and progress analytics.
              </p>

              {/* Feature Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Smart Timer</h4>
                    <p className="text-xs text-muted-foreground">Pomodoro & custom sessions</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Ambient Sounds</h4>
                    <p className="text-xs text-muted-foreground">Multiple sounds & volume control</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <ListChecks className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Habit Tracking</h4>
                    <p className="text-xs text-muted-foreground">Build consistent routines</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Progress Analytics</h4>
                    <p className="text-xs text-muted-foreground">Track your growth</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/focusflow"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4" />
                  Start Focusing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setShowFocusFlowTutorial(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
                >
                  <Info className="w-4 h-4" />
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative max-w-xs mx-auto">
                {/* Phone Frame */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-background rounded-[2rem] overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="aspect-[9/19.5] bg-gradient-to-br from-background via-primary/5 to-blue-500/10 p-5 flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-5">
                        <h3 className="text-base font-bold">FocusFlow</h3>
                        <p className="text-xs text-muted-foreground">Focus · Learn · Grow</p>
                      </div>

                      {/* Timer Circle */}
                      <div className="flex-1 flex items-center justify-center mb-5">
                        <div className="relative w-28 h-28">
                          <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                          <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">25:00</div>
                              <div className="text-xs text-muted-foreground">Focus</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-card rounded-lg p-2.5 text-center border">
                          <div className="text-sm font-bold text-primary">4</div>
                          <div className="text-xs text-muted-foreground">Sessions</div>
                        </div>
                        <div className="bg-card rounded-lg p-2.5 text-center border">
                          <div className="text-sm font-bold text-green-500">120m</div>
                          <div className="text-xs text-muted-foreground">Minutes</div>
                        </div>
                        <div className="bg-card rounded-lg p-2.5 text-center border">
                          <div className="text-sm font-bold text-orange-500">7</div>
                          <div className="text-xs text-muted-foreground">Streak</div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="flex justify-around py-2">
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center mb-1">
                            <ListChecks className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-xs text-primary font-medium">Habits</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center mb-1">
                            <CheckSquare className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground">Plan</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center mb-1">
                            <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground">Today</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-black rounded-b-xl"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
                
                {/* Feature Callouts */}
                <div className="absolute -left-6 top-1/4 hidden lg:block">
                  <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg max-w-28">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Volume2 className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-medium">Ambient</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rain, cafe sounds</p>
                  </div>
                </div>
                
                <div className="absolute -right-6 top-3/4 hidden lg:block">
                  <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg max-w-28">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BarChart2 className="w-3 h-3 text-orange-500" />
                      <span className="text-xs font-medium">Analytics</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Track progress</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DoMemo Introduction Section */}
      <section className="bg-[#fdfcfb] py-20 border-y border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Visual Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden p-8 flex flex-col gap-6">
                {/* Paper Mockup */}
                <div className="flex-1 bg-[#fffdfa] border border-amber-50 shadow-inner rounded-xl p-6 relative group cursor-pointer transition-all hover:shadow-md">
                   <div className="absolute top-4 right-4 text-amber-900/20 group-hover:text-amber-900/40 transition-colors">
                     <FlipHorizontal className="w-5 h-5" />
                   </div>
                   <div className="space-y-4">
                     <div className="h-2 w-3/4 bg-amber-900/10 rounded"></div>
                     <div className="h-2 w-1/2 bg-amber-900/10 rounded"></div>
                     <div className="h-2 w-2/3 bg-amber-900/10 rounded"></div>
                     <div className="h-32"></div>
                     <div className="pt-8 border-t border-amber-900/5 italic text-amber-900/40 text-sm">
                       "Reading is not the same as remembering..."
                     </div>
                   </div>
                </div>
                
                {/* Controls Mockup */}
                <div className="flex justify-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-amber-100/50 text-amber-900/60 text-xs font-bold font-sans tracking-wider uppercase">Flip (F)</div>
                  <div className="px-4 py-2 rounded-full bg-amber-100/50 text-amber-900/60 text-xs font-bold font-sans tracking-wider uppercase">Hide (H)</div>
                  <div className="px-4 py-2 rounded-full bg-amber-100/50 text-amber-900/60 text-xs font-bold font-sans tracking-wider uppercase">Clear (Del)</div>
                </div>
              </div>
              
              {/* Decorative background blur */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            {/* Right Content - Text Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium mb-6 font-sans">
                <FileText className="w-4 h-4" />
                New Study Tool
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950 font-serif italic">
                DoMemo
              </h2>
              
              <p className="text-xl text-amber-900/80 mb-8 leading-relaxed font-serif">
                A distraction-free memory desk for anyone who learns by writing. 
                Built on the principle that true learning happens through active recall, not passive reading.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                    <FlipHorizontal className="w-6 h-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 font-sans mb-1">Active Recall</h3>
                    <p className="text-amber-900/70 text-sm">Flip your notes to test your memory instantly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                    <Layers className="w-6 h-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 font-sans mb-1">Dual Paper System</h3>
                    <p className="text-amber-900/70 text-sm">Use a second sheet for hints, translations, or context.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                    <Keyboard className="w-6 h-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 font-sans mb-1">Keyboard First</h3>
                    <p className="text-amber-900/70 text-sm">Full control without your hands ever leaving the keys.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/domemo/app"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 text-white rounded-full hover:bg-amber-950 transition-colors shadow-lg shadow-amber-900/20 font-sans font-medium"
                >
                  <Play className="w-4 h-4" />
                  Open DoMemo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/domemo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-100 text-amber-900 rounded-full hover:bg-amber-200 transition-colors font-sans font-medium"
                >
                  <Info className="w-4 h-4" />
                  Read More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bill Splitter Introduction Section */}
      <section className="bg-[#F5F0E8] py-20 border-b border-[#E2D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Right Content - Visual Preview (Order reversed for layout variety) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <div className="relative bg-[#FDFAF4] rounded-3xl shadow-xl border border-[#E2D9C8] overflow-hidden p-8 flex flex-col gap-6">
                {/* Result Card Mockup */}
                <div className="bg-[#F5F0E8] border border-[#E2D9C8] rounded-2xl p-6 shadow-sm relative group cursor-pointer transition-all hover:shadow-md">
                   <div className="flex justify-between items-center mb-6">
                     <div className="w-10 h-10 bg-[#8A5F41] rounded-full flex items-center justify-center text-white font-bold">B</div>
                     <div className="h-4 w-24 bg-[#8A5F41]/10 rounded"></div>
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#6B7A2F]/20"></div>
                         <div className="h-3 w-20 bg-[#2A1F14]/10 rounded"></div>
                       </div>
                       <div className="h-4 w-16 bg-[#8A5F41]/20 rounded"></div>
                     </div>
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#3A6A8A]/20"></div>
                         <div className="h-3 w-20 bg-[#2A1F14]/10 rounded"></div>
                       </div>
                       <div className="h-4 w-16 bg-[#8A5F41]/20 rounded"></div>
                     </div>
                   </div>
                   <div className="mt-8 pt-6 border-t border-[#E2D9C8] flex justify-between items-center">
                     <div className="h-3 w-32 bg-[#9C8470]/20 rounded"></div>
                     <div className="h-6 w-24 bg-[#8A5F41] rounded-lg"></div>
                   </div>
                </div>
                
                {/* Mode Icons Mockup */}
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8A5F41]/10 flex items-center justify-center text-[#8A5F41] font-bold text-lg">≡</div>
                  <div className="w-10 h-10 rounded-xl bg-[#8A5F41]/10 flex items-center justify-center text-[#8A5F41] font-bold text-lg">♂♀</div>
                  <div className="w-10 h-10 rounded-xl bg-[#8A5F41]/10 flex items-center justify-center text-[#8A5F41] font-bold text-lg">⚖</div>
                  <div className="w-10 h-10 rounded-xl bg-[#8A5F41]/10 flex items-center justify-center text-[#8A5F41] font-bold text-lg">★</div>
                </div>
              </div>
            </motion.div>

            {/* Left Content - Text Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8A5F41]/10 text-[#8A5F41] rounded-full text-sm font-medium mb-6 font-sans">
                <Calculator className="w-4 h-4" />
                Finance Tool
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A1F14] font-serif italic">
                Bill Splitter
              </h2>
              
              <p className="text-xl text-[#6B5640] mb-8 leading-relaxed font-serif">
                A elegant and precise tool for settling restaurant bills with friends. 
                Supporting multiple AA methods from simple equal splits to gender-based or weighted calculations.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FDFAF4] rounded-2xl flex items-center justify-center border border-[#E2D9C8]">
                    <PieChart className="w-6 h-6 text-[#8A5F41]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A1F14] font-sans mb-1">Flexible Methods</h3>
                    <p className="text-[#9C8470] text-sm">Equal split, gender ratio, weighted, host mode, and custom percentages.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FDFAF4] rounded-2xl flex items-center justify-center border border-[#E2D9C8]">
                    <RotateCcw className="w-6 h-6 text-[#8A5F41]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A1F14] font-sans mb-1">Fate's Wheel</h3>
                    <p className="text-[#9C8470] text-sm">Can't decide? Let the random wheel pick the lucky one to treat today.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FDFAF4] rounded-2xl flex items-center justify-center border border-[#E2D9C8]">
                    <Smartphone className="w-6 h-6 text-[#8A5F41]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A1F14] font-sans mb-1">Mobile Ready</h3>
                    <p className="text-[#9C8470] text-sm">Optimized for splitting bills on the go directly at the table.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/bill-splitter"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8A5F41] text-white rounded-full hover:bg-[#A77050] transition-colors shadow-lg shadow-[#8A5F41]/20 font-sans font-medium"
                >
                  <Play className="w-4 h-4" />
                  Split Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Sliding Section */}
      <section className="bg-[#f8f5f0] py-20 border-y border-amber-100/50 overflow-hidden relative min-h-[600px] flex items-center group/slider">
        {/* Navigation Buttons */}
        <button
          onClick={() => setActiveGameSlide((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/40 hover:bg-white/60 text-amber-900/40 hover:text-amber-900 transition-all opacity-0 group-hover/slider:opacity-100 backdrop-blur-sm border border-amber-200/30 shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveGameSlide((prev) => (prev + 1) % 3)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/40 hover:bg-white/60 text-amber-900/40 hover:text-amber-900 transition-all opacity-0 group-hover/slider:opacity-100 backdrop-blur-sm border border-amber-200/30 shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <AnimatePresence mode="wait">
            {activeGameSlide === 0 ? (
              <motion.div
                key="tetris-slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left Content - Text Info */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium mb-6 font-sans">
                    <Gamepad2 className="w-4 h-4 text-amber-900" />
                    Nokia Edition
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950 font-serif italic">
                    Nokia Tetris
                  </h2>
                  
                  <p className="text-xl text-amber-900/80 mb-8 leading-relaxed font-serif">
                    A faithful recreation of the classic Tetris game styled after the iconic Nokia mobile phone era. 
                    Nostalgic olive-green LCD, chunky D-pad, and monochrome pixel aesthetic.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">The Vibe</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Late 90s monochrome pixel art and authentic phone shell design.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">Features</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Ghost pieces, increasing speed levels, and full keyboard support.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/tetris"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 text-white rounded-full hover:bg-amber-950 transition-all shadow-lg shadow-amber-900/20 font-sans font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Start Playing
                    </Link>
                    <div className="inline-flex items-center gap-2 px-6 py-3.5 text-amber-900/40 font-sans text-xs uppercase tracking-widest">
                       Pure Nostalgia • No Ads
                    </div>
                  </div>
                </div>

                {/* Right Content - Visual Preview */}
                <div className="relative flex justify-center">
                  <div className="w-[240px] bg-[#3a3a2e] rounded-[18px_18px_40px_40px] p-3 shadow-2xl border border-white/5 relative transform rotate-6 hover:rotate-0 transition-transform duration-500">
                     <div className="bg-[#1a1a14] rounded-lg p-1.5 mb-3 shadow-inner">
                       <div className="bg-[#8a9a2a] aspect-[10/12] rounded flex flex-col items-center justify-center gap-1 overflow-hidden relative">
                          <div className="absolute top-4 right-4 w-4 h-4 bg-[#2a3008]/20"></div>
                          <div className="text-[10px] font-bold text-[#2a3008] tracking-widest">TETRIS</div>
                          <div className="w-12 h-1 bg-[#2a3008]"></div>
                          <div className="grid grid-cols-4 gap-0.5 mt-2">
                            <div className="w-2 h-2 bg-[#2a3008]"></div>
                            <div className="w-2 h-2 bg-[#2a3008]"></div>
                            <div className="w-2 h-2 bg-[#2a3008]"></div>
                            <div className="w-2 h-2 bg-[#2a3008]"></div>
                          </div>
                       </div>
                     </div>
                     <div className="w-10 h-10 bg-[#2a2a20] rounded-full mx-auto mb-2 flex items-center justify-center">
                       <div className="w-3 h-3 border-2 border-[#8a9a50] rounded-full"></div>
                     </div>
                     <div className="flex justify-between px-2 pb-2">
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : activeGameSlide === 1 ? (
              <motion.div
                key="snake-slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left Content - Text Info */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium mb-6 font-sans">
                    <Smartphone className="w-4 h-4 text-amber-900" />
                    Snake Edition
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950 font-serif italic">
                    Nokia Snake
                  </h2>
                  
                  <p className="text-xl text-amber-900/80 mb-8 leading-relaxed font-serif">
                    The legendary game that defined mobile gaming. Experience Snake in its purest form, 
                    with classic Nokia 3310 aesthetics and a modern "Warp" mode.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">Gameplay</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Classic growth mechanics with smooth, responsive controls.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">New Mode</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Warp through walls and avoid tactical bombs in Mode 2.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/snake"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 text-white rounded-full hover:bg-amber-950 transition-all shadow-lg shadow-amber-900/20 font-sans font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Start Playing
                    </Link>
                    <div className="inline-flex items-center gap-2 px-6 py-3.5 text-amber-900/40 font-sans text-xs uppercase tracking-widest">
                       Authentic Sound • Dual Mode
                    </div>
                  </div>
                </div>

                {/* Right Content - Visual Preview */}
                <div className="relative flex justify-center">
                  <div className="w-[240px] bg-[#3a3a2e] rounded-[18px_18px_40px_40px] p-3 shadow-2xl border border-amber-900/10 relative transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                     <div className="bg-[#1a1a14] rounded-lg p-1.5 mb-3 shadow-inner">
                       <div className="bg-[#8bac0f] aspect-[10/12] rounded flex flex-col items-center justify-center gap-1 overflow-hidden relative">
                          <div className="absolute top-2 left-2 text-[6px] text-[#1a2800] opacity-40 font-mono">SCR: 042</div>
                          <div className="w-1.5 h-1.5 bg-[#1a2800] absolute top-1/2 left-1/4"></div>
                          <div className="flex flex-col gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <div className="w-2 h-2 bg-[#0f1a00] rounded-sm"></div>
                             <div className="w-2 h-2 bg-[#1a2800] rounded-sm"></div>
                             <div className="w-2 h-2 bg-[#1a2800] rounded-sm"></div>
                             <div className="w-2 h-2 bg-[#1a2800] rounded-sm"></div>
                          </div>
                          <div className="text-[10px] font-bold text-[#1a2800] tracking-widest mt-auto mb-2 opacity-20 font-mono">SNAKE</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 bg-[#2a2a20] rounded-full mx-auto mb-2 flex items-center justify-center">
                       <div className="w-3 h-3 border-2 border-[#8a9a50] rounded-full"></div>
                     </div>
                     <div className="flex justify-between px-2 pb-2">
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="rapid-roll-slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left Content - Text Info */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium mb-6 font-sans">
                    <Smartphone className="w-4 h-4 text-amber-900" />
                    Rapid Roll Edition
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950 font-serif italic">
                    Rapid Roll
                  </h2>
                  
                  <p className="text-xl text-amber-900/80 mb-8 leading-relaxed font-serif">
                    The addictive platform survival game from the Nokia era. Keep the ball on the platforms 
                    as they move up, avoiding the spikes at the top and the bottomless pit.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">Objective</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Survive as long as possible on moving platforms.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-amber-900 font-bold uppercase tracking-wider text-xs font-sans">Controls</h3>
                      <p className="text-sm text-amber-900/60 font-sans">Use Left and Right to guide the ball through the maze.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/rapidroll"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 text-white rounded-full hover:bg-amber-950 transition-all shadow-lg shadow-amber-900/20 font-sans font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Start Playing
                    </Link>
                    <div className="inline-flex items-center gap-2 px-6 py-3.5 text-amber-900/40 font-sans text-xs uppercase tracking-widest">
                       High Speed • Classic Fun
                    </div>
                  </div>
                </div>

                {/* Right Content - Visual Preview */}
                <div className="relative flex justify-center">
                  <div className="w-[240px] bg-[#3a3a2e] rounded-[18px_18px_40px_40px] p-3 shadow-2xl border border-amber-900/10 relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
                     <div className="bg-[#1a1a14] rounded-lg p-1.5 mb-3 shadow-inner">
                       <div className="bg-[#8bac0f] aspect-[10/12] rounded flex flex-col items-center justify-center gap-1 overflow-hidden relative">
                          <div className="absolute top-2 left-2 text-[6px] text-[#1a2800] opacity-40 font-mono">SCR: 128</div>
                          {/* Ball */}
                          <div className="w-3 h-3 bg-[#0f1a00] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                          {/* Platforms */}
                          <div className="w-12 h-1 bg-[#1a2800] absolute top-1/4 left-1/4"></div>
                          <div className="w-16 h-1 bg-[#1a2800] absolute top-[60%] left-1/2"></div>
                          <div className="w-10 h-1 bg-[#1a2800] absolute top-[80%] right-1/4"></div>
                          <div className="text-[8px] font-bold text-[#1a2800] tracking-widest mt-auto mb-2 opacity-20 font-mono">RAPID ROLL</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 bg-[#2a2a20] rounded-full mx-auto mb-2 flex items-center justify-center">
                       <div className="w-3 h-3 border-2 border-[#8a9a50] rounded-full"></div>
                     </div>
                     <div className="flex justify-between px-2 pb-2">
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                       <div className="w-6 h-2 bg-[#2a2a20] rounded-full"></div>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slider Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveGameSlide(i)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  activeGameSlide === i ? 'bg-amber-900 w-20' : 'bg-amber-900/20 hover:bg-amber-900/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RedWolf Character Showcase Section */}
      <section className="py-16 relative overflow-hidden bg-[#020202]">
        {/* Universal Animated Starfield Background (Galaxy Black) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]"></div>
          
          {/* Galaxy texture effect */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(138, 95, 65, 0.1) 0%, transparent 70%)' }}></div>
          <div className="absolute inset-0 opacity-30 animate-star-move-slow will-change-transform">
            {stars.slow.map((s) => (
              <div 
                key={`star-s-${s.id}`}
                className="absolute w-px h-px bg-white rounded-full"
                style={{ 
                  top: s.top, 
                  left: s.left,
                  animation: `pulse ${s.duration} infinite ${s.delay}`
                }}
              />
            ))}
          </div>

          {/* Animated Stars Layer 2 (Medium) */}
          <div className="absolute inset-0 opacity-50 animate-star-move-medium will-change-transform">
            {stars.medium.map((s) => (
              <div 
                key={`star-m-${s.id}`}
                className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full"
                style={{ 
                  top: s.top, 
                  left: s.left,
                  animation: `pulse ${s.duration} infinite ${s.delay}`
                }}
              />
            ))}
          </div>

          {/* Animated Stars Layer 3 (Large/Twinkling) */}
          <div className="absolute inset-0 opacity-70 animate-star-move-fast will-change-transform">
            {stars.fast.map((s) => (
              <div 
                key={`star-l-${s.id}`}
                className="absolute w-1 h-1 bg-yellow-100 rounded-full"
                style={{ 
                  top: s.top, 
                  left: s.left,
                  animation: `twinkle ${s.duration} infinite ${s.delay}`
                }}
              />
            ))}
          </div>

          {/* Nebula clouds */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 mix-blend-screen"></div>
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[80px] animate-pulse will-change-transform"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] animate-pulse will-change-transform" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg border border-white/10" style={{ backgroundColor: 'rgba(138, 95, 65, 0.9)', color: '#F3E4C9' }}>
              <Gamepad2 className="w-4 h-4" />
              3D Character Design
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
              Meet RedWolf
            </h2>
            <p className="text-xl max-w-2xl mx-auto font-medium" style={{ color: '#F3E4C9' }}>
              A cybernetic warrior created as a fusion of human-like instinct and machine-level accuracy.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2,
                scale: { type: "spring", stiffness: 400, damping: 25 },
                y: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="lg:col-span-3 cursor-pointer will-change-transform"
            >
              <div className="rounded-3xl p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 backdrop-blur-md" style={{ background: `linear-gradient(135deg, rgba(138, 95, 65, 0.9) 0%, rgba(167, 127, 96, 0.8) 100%)`, borderColor: 'rgba(204, 214, 127, 0.4)' }}>
                {/* Level Display */}
                <div className="mb-6">
                  <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#F3E4C9' }}>LEVEL</div>
                  <div className="text-5xl font-bold text-white mb-2">17</div>
                  <div className="text-xs mb-2" style={{ color: '#F3E4C9' }}>EXP: 8,450 / 15,000</div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(204, 214, 127, 0.3)' }}>
                    <div className="h-2 rounded-full" style={{ width: '56.3%', background: `linear-gradient(90deg, #CCD67F 0%, #F3E4C9 100%)` }}></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#F3E4C9' }}>STATS</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" style={{ color: '#CCD67F' }} />
                      <span className="text-sm">HEALTH</span>
                    </div>
                    <span className="text-sm">4,250 / 4,250</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(204, 214, 127, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '100%', backgroundColor: '#CCD67F' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: '#F3E4C9' }} />
                      <span className="text-sm">ENERGY</span>
                    </div>
                    <span className="text-sm">2,100 / 2,500</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(243, 228, 201, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '84%', backgroundColor: '#F3E4C9' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" style={{ color: '#A77F60' }} />
                      <span className="text-sm">ATTACK</span>
                    </div>
                    <span className="text-sm">850</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(167, 127, 96, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '68%', backgroundColor: '#A77F60' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" style={{ color: '#8A5F41' }} />
                      <span className="text-sm">DEFENSE</span>
                    </div>
                    <span className="text-sm">620</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(138, 95, 65, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '52%', backgroundColor: '#8A5F41' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: '#CCD67F' }} />
                      <span className="text-sm">SPEED</span>
                    </div>
                    <span className="text-sm">780</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(204, 214, 127, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '65%', backgroundColor: '#CCD67F' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" style={{ color: '#F3E4C9' }} />
                      <span className="text-sm">CRITICAL</span>
                    </div>
                    <span className="text-sm">18.5%</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(243, 228, 201, 0.3)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '18.5%', backgroundColor: '#F3E4C9' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Center Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08, zIndex: 50 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                scale: { duration: 0.4 }
              }}
              className="lg:col-span-6 flex justify-center cursor-pointer will-change-transform"
            >
              <div className="relative group">
                {/* Video container with Galaxy Black background and hover frame effect */}
                <div 
                  className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-3xl overflow-hidden border-4 p-1 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(204,214,127,0.3)] group-hover:border-[#CCD67F] select-none pointer-events-none will-change-[transform,shadow]" 
                  style={{ borderColor: '#A77F60', background: 'radial-gradient(circle at center, #111111 0%, #000000 100%)' }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    {/* Character display */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      className="w-full h-full object-contain relative z-10"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <source src="/video/RedWolf.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Lore Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4,
                scale: { type: "spring", stiffness: 400, damping: 25 },
                y: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="lg:col-span-3 cursor-pointer will-change-transform"
            >
              <div className="rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 backdrop-blur-md" style={{ background: `linear-gradient(135deg, rgba(243, 228, 201, 0.9) 0%, rgba(204, 214, 127, 0.8) 100%)`, borderColor: 'rgba(167, 127, 96, 0.4)' }}>
                {/* Character Lore Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, #8A5F41 0%, #A77F60 100%)` }}>
                    <FileText className="w-7 h-7" style={{ color: '#F3E4C9' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black" style={{ color: '#8A5F41' }}>Character Lore</h3>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#A77F60' }}>ORIGIN STORY</p>
                  </div>
                </div>

                {/* Lore Content */}
                <div className="space-y-5" style={{ color: '#8A5F41' }}>
                  <p className="text-sm font-medium leading-relaxed">
                    Born from childhood dreams and forged through years of artistic growth, RedWolf emerged from sketches in school notebooks to a fully realized 3D warrior.
                  </p>
                  <p className="text-sm font-medium leading-relaxed">
                    What began as a simple wolf drawing evolved into a cybernetic legend - part organic instinct, part digital precision.
                  </p>
                  <p className="text-sm font-medium leading-relaxed">
                    This character represents the journey from imagination to creation, embodying the fusion of childhood wonder with adult craftsmanship.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Description */}
          <div className="flex justify-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3,
                scale: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="max-w-3xl px-8 py-8 rounded-[40px] backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer text-center transition-colors duration-300"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <h3 className="text-3xl font-black mb-4" style={{ color: '#F3E4C9' }}>Crafted with Passion</h3>
              <p className="text-lg leading-relaxed font-medium" style={{ color: '#CCD67F' }}>
                RedWolf represents the culmination of my 3D modeling and animation skills. 
                Every detail, from the cybernetic enhancements to the fluid movements, 
                was meticulously crafted to bring this character to life.
              </p>
            </motion.div>
          </div>
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

      {/* FocusFlow Tutorial Modal */}
      {showFocusFlowTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowFocusFlowTutorial(false)}>
          <FocusFlowTutorialModal onClose={() => setShowFocusFlowTutorial(false)} />
        </div>
      )}

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

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
