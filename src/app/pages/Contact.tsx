import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, Linkedin, Github, Camera, Coffee } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "howell.cho319@gmail.com",
      link: "mailto:howell.cho319@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+60 11-233 4736",
      link: "tel:+60112334736",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Klang, Selangor, Malaysia",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/cho-sin-hong-9139a3378/",
      color: "hover:text-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/ChoSinHong",
      color: "hover:text-gray-800",
    },
    {
      icon: Camera,
      label: "Instagram",
      link: "https://www.instagram.com/howellcho/",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/30 via-background to-accent/20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work Together
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              I'm always excited to collaborate on new projects and creative ideas. 
              Whether you have a question, project proposal, or just want to say hello, 
              feel free to reach out!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div id="contact-form" className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Send Me a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-accent/20 to-secondary/30 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="flex items-start gap-4 p-3 rounded-xl hover:bg-background/50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-medium mt-1">{item.value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-medium mt-1">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground ${social.color} transition-all hover:scale-110`}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Buy Me a Coffee */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800 rounded-3xl p-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coffee className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200">
                    Buy Me a Coffee
                  </h3>
                </div>
                <p className="text-orange-700 dark:text-orange-300 text-sm mb-6">
                  Support my work and fuel my coding sessions! ☕
                </p>
                
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-800">
                  <div className="aspect-square max-w-64 mx-auto mb-4">
                    <ImageWithFallback
                      src="/images/materials/buymeacoffee.jpeg"
                      alt="Buy Me a Coffee QR Code - Touch 'n Go eWallet"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      CHO SIN HONG
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Touch 'n Go eWallet
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                      Scan with any of your banking apps or eWallets to transfer money or pay.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    🇲🇾 Malaysia National QR • Secure Payment
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-primary to-chart-3 rounded-3xl p-8 text-primary-foreground">
              <h3 className="text-xl font-semibold mb-3">Currently Available</h3>
              <p className="opacity-90">
                I'm open to new opportunities and collaborations. Let's create something 
                amazing together!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Quick answers to common questions about working with me
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {[
              {
                q: "What makes your AI and computer vision projects stand out?",
                a: "I specialize in cutting-edge AI solutions including automated oil palm tree detection in aerial imagery, paddy disease classification systems, and weather-adaptive YOLO models for agricultural applications. My work at Aonic involved building end-to-end computer vision pipelines that enhanced detection accuracy by 25% while reducing preprocessing time by 40%. I combine deep learning expertise with practical deployment experience using frameworks like PyTorch, YOLO, and QGIS.",
              },
              {
                q: "How do you approach project management for complex technical initiatives?",
                a: "With 100% proficiency in project management, I've successfully led teams across 20+ projects from hackathons to enterprise applications. As Team Mentor at APU, I guide student teams in national/international competitions, coordinating technical development, prototyping, and presentation delivery. My approach combines agile methodologies with strategic planning, ensuring high-quality outputs while fostering innovation and collaboration within diverse teams.",
              },
              {
                q: "What's your experience with full-stack development and modern technologies?",
                a: "I'm proficient in the complete development stack - from React/TypeScript frontends to Python/Java backends, with expertise in cloud deployment using AWS (EC2, S3, Route 53). My portfolio includes 20+ projects ranging from e-commerce platforms and management systems to AI-powered applications. I've built everything from medical center management systems to real-time data analysis platforms, always focusing on scalable architecture and user experience.",
              },
              {
                q: "How do you handle international collaboration and communication?",
                a: "As a multilingual professional fluent in Chinese (native), Cantonese, Malay, English, and basic Japanese, I excel at cross-cultural collaboration. My dual degree program between APU (Malaysia) and De Montfort University (UK) has given me unique perspectives on both Asian and Western development approaches. I've worked with international teams and am comfortable with remote collaboration across different time zones (based in Malaysia GMT+8).",
              },
              {
                q: "What's your approach to AI automation and intelligent systems?",
                a: "I focus on practical AI applications that solve real-world problems. My experience includes developing automated annotation tools for agricultural research, implementing machine learning workflows for data analysis, and creating intelligent systems for various industries. I stay current with the latest AI trends, holding certifications from NVIDIA (AI on Jetson Nano), Microsoft (Generative AI), and Huawei (Big Data), ensuring I can deliver cutting-edge solutions.",
              },
              {
                q: "What leadership experience do you bring to technical projects?",
                a: "I have extensive leadership experience spanning 8+ years, from Head Student Librarian to current Team Mentor roles. I've led technical teams, organized major events, mentored junior developers, and managed complex project deliverables. My leadership style combines technical expertise with strategic communication, helping teams achieve ambitious goals while maintaining high standards and fostering professional growth.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
