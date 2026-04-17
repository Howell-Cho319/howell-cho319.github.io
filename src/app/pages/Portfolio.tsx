import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Full-Stack Development", "System Development", "AI Development", "Data Science Projects", "Application Development", "Web Design", "Game Development", "Research Proposal"];

  const projects = [
    {
      id: 1,
      title: "Asia Pacific University Medical Centre (AMC) Desk Application",
      category: "System Development",
      description: "Led team development of Java-based medical center management system with user registration, appointment scheduling, payment updates, and role-based dashboards for managers, staff, doctors, and customers.",
      image: "/images/portfolio/portfolio1.png",
      tags: ["Java", "Java Swing GUI", "OOP", "UML"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 2,
      title: "Flight Delay Prediction and Carrier Reliability Assessment",
      category: "Data Science Projects",
      description: "Designed and implemented complete data analysis using R for flight delay prediction, including data cleaning, preprocessing, validation, transformation, and visualization of flights dataset.",
      image: "/images/portfolio/portfolio2.png",
      tags: ["R", "Data Analysis", "Machine Learning", "Jira"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 3,
      title: "Oil Palm Tree Detection Pipeline",
      category: "AI Development",
      description: "Developed AI-based computer vision solution for automated oil palm tree detection in aerial imagery, contributing to dataset validation, annotation refinement, and scalable model training.",
      image: "/images/portfolio/portfolio3.png",
      tags: ["Python", "Computer Vision", "YOLO", "QGIS"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 4,
      title: "Paddy Disease Label Validator/Adjuster",
      category: "AI Development",
      description: "Built custom tool for plant disease detection research to verify and refine bounding box annotations, minimizing label errors and improving detection model precision.",
      image: "/images/portfolio/portfolio5.png",
      tags: ["Python", "Machine Learning", "Computer Vision", "Data Labeling"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 5,
      title: "ActiveGearApp - Fitness E-commerce Platform",
      category: "Full-Stack Development",
      description: "Led development of full-stack e-commerce web application for selling gym equipment and fitness services, inspired by Lazada but tailored for fitness industry with eco-friendly practices.",
      image: "/images/portfolio/portfolio6.png",
      tags: ["HTML", "CSS", "JavaScript", "Java", "SQL"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 6,
      title: "Aquarians Society - Ocean Conservation Website",
      category: "Full-Stack Development",
      description: "Designed and developed website for student society focused on ocean protection, selling diving tickets, and promoting homestay packages to increase awareness of ocean conservation.",
      image: "/images/portfolio/portfolio7.png",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 7,
      title: "Equinox Florist E-commerce Platform",
      category: "Web Design",
      description: "Developed e-commerce platform for Equinox Florist to sell floral arrangements online with focus on aesthetics, usability, and integrated social media sharing features.",
      image: "/images/portfolio/portfolio8.png",
      tags: ["HTML", "JavaScript", "Social Media Integration"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 8,
      title: "Train Schedule Management System",
      category: "System Development",
      description: "Built comprehensive system using C language to display train schedules, manage bookings, with database using binary files and search functionalities for users and administrators.",
      image: "/images/portfolio/portfolio9.png",
      tags: ["C", "Binary Files", "System Design"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 9,
      title: "CGPA/GPA Calculator",
      category: "Application Development",
      description: "Developed CGPA/GPA Calculator using C language with console interface, file handling for academic records, and features for teachers to store and retrieve student records efficiently.",
      image: "/images/portfolio/portfolio10.png",
      tags: ["C", "File Handling", "Academic Tools"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 10,
      title: "Safe Speak App",
      category: "Application Development",
      description: "Mobile application development project focused on secure communication and user safety features.",
      image: "/images/portfolio/portfolio11.png",
      tags: ["Mobile Development", "Security", "Communication"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 11,
      title: "Cook Story App",
      category: "Application Development",
      description: "Recipe and cooking application that allows users to share cooking stories and discover new recipes.",
      image: "/images/portfolio/portfolio12.png",
      tags: ["Mobile Development", "Recipe Management", "Social Features"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 12,
      title: "ITASK APP",
      category: "Application Development",
      description: "Task management application designed to help users organize and track their daily activities and projects efficiently.",
      image: "/images/portfolio/portfolio13.png",
      tags: ["Task Management", "Productivity", "Mobile App"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 13,
      title: "Speed Mart Management System",
      category: "System Development",
      description: "Comprehensive management system for retail operations including inventory management, sales tracking, and customer management features.",
      image: "/images/portfolio/portfolio14.png",
      tags: ["System Design", "Retail Management", "Database"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 14,
      title: "Food Ordering System",
      category: "System Development",
      description: "Online food ordering platform with menu management, order processing, and delivery tracking capabilities for restaurants and customers.",
      image: "/images/portfolio/portfolio15.png",
      tags: ["Web Development", "Order Management", "Restaurant System"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 15,
      title: "Bank Management System",
      category: "System Development",
      description: "Banking system application with account management, transaction processing, and financial reporting features for banking operations.",
      image: "/images/portfolio/portfolio16.png",
      tags: ["Banking System", "Financial Management", "Security"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 16,
      title: "Finance Analyze - Data Science Project",
      category: "Data Science Projects",
      description: "Financial data analysis project involving market trends analysis, risk assessment, and investment portfolio optimization using statistical methods.",
      image: "/images/portfolio/portfolio17.png",
      tags: ["Data Analysis", "Financial Modeling", "Statistics"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 17,
      title: "Tick-tack-toe Game",
      category: "Game Development",
      description: "Classic tic-tac-toe game implementation with interactive user interface and game logic for entertainment and learning purposes.",
      image: "/images/portfolio/portfolio18.png",
      tags: ["Game Logic", "Interactive UI", "Entertainment"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 18,
      title: "3D Model Development",
      category: "Game Development",
      description: "3D modeling project involving creation of three-dimensional objects and environments for gaming or visualization applications.",
      image: "/images/portfolio/portfolio19.png",
      tags: ["3D Modeling", "Blender", "Visualization"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 19,
      title: "AWD-YOLO: Weather-Adaptive YOLOv8 for Broccoli Disease Detection",
      category: "Research Proposal",
      description: "Research proposal for weather-adaptive YOLO model specifically designed for detecting broccoli diseases in Malaysian tropical highlands conditions.",
      image: "/images/portfolio/portfolio20.png",
      tags: ["YOLO", "Computer Vision", "Agricultural AI", "Research"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
    {
      id: 20,
      title: "Graduation Ceremony Supplies E-commerce (AWS)",
      category: "Web Design",
      description: "E-commerce website for graduation ceremony supplies deployed using AWS cloud services including EC2, S3, Route 53, and IAM for learning cloud architecture and deployment.",
      image: "/images/portfolio/portfolio21.png",
      tags: ["AWS", "EC2", "S3", "Route 53", "Cloud Deployment"],
      link: "https://github.com/ChoSinHong",
      github: "https://github.com/ChoSinHong",
    },
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
              My Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A curated collection of projects showcasing my skills in design, development, 
              and creative problem-solving. Each project reflects my passion for creating 
              meaningful digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform"
                        aria-label="View project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform"
                        aria-label="View code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs px-3 py-1 bg-accent/30 text-accent-foreground rounded-full w-fit mb-3">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-accent/20 to-secondary/30 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on innovative projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            Start a Project
          </a>
        </motion.div>
      </section>
    </div>
  );
}
