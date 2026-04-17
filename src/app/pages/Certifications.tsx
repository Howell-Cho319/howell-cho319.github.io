import { motion } from "motion/react";
import { Award, GraduationCap, Trophy, Star, ExternalLink } from "lucide-react";

export function Certifications() {
  const certifications = [
    {
      id: 1,
      title: "Generative AI Overview for Project Managers",
      issuer: "Project Management Institute",
      date: "April 2026",
      type: "Project Management",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "Not specified",
      skills: ["Generative AI", "Project Management"],
    },
    {
      id: 2,
      title: "HCIA-Big Data V3.5",
      issuer: "Huawei",
      date: "Not specified",
      type: "Big Data",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "EBG30260412000110",
      skills: ["Big Data Systems", "Stream Processing", "Data Engineering"],
    },
    {
      id: 3,
      title: "AI and Digital Transformation in Government",
      issuer: "University of Oxford",
      date: "Not specified",
      type: "AI & Government",
      icon: Star,
      color: "bg-chart-3/20 text-chart-3",
      credential: "Not specified",
      skills: ["Artificial Intelligence (AI)", "Digital Transformation", "Data Governance", "Cybersecurity"],
    },
    {
      id: 4,
      title: "AI on Jetson Nano",
      issuer: "NVIDIA",
      date: "Not specified",
      type: "Edge AI",
      icon: Award,
      color: "bg-chart-4/20 text-chart-4",
      credential: "_SMMCkJuTvGTGRZ4HPswog",
      skills: ["Edge AI Development (NVIDIA Jetson)", "Computer Vision", "Deep Learning", "PyTorch Model Training & Deployment"],
    },
    {
      id: 5,
      title: "Hydraulic Modeling with HEC-RAS (USACE)",
      issuer: "US Army Corps of Engineers",
      date: "Not specified",
      type: "Engineering",
      icon: GraduationCap,
      color: "bg-chart-5/20 text-chart-5",
      credential: "adec1e2c14574163960d3ef16a7de323",
      skills: ["Hydraulic Modeling (HEC-RAS)", "2D Flow Simulation", "Analysis Flood Risk", "Dam Breach Modeling"],
    },
    {
      id: 6,
      title: "Rapid Teacher Training Programme on Distance, Open and Online Learning",
      issuer: "UNESCO",
      date: "Not specified",
      type: "Education",
      icon: Star,
      color: "bg-primary/20 text-primary",
      credential: "0311b6db684649c9a507cae6f98e03c3",
      skills: ["Online Teaching", "Instructional Design", "EdTech Integration"],
    },
    {
      id: 7,
      title: "ICT Essentials Course for Teachers",
      issuer: "UNESCO",
      date: "Not specified",
      type: "Education Technology",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "2fe638c75ef74682bfa47afce030e4dc",
      skills: ["Digital Tools & Classroom Technology", "ICT Integration in Education", "Project-Based Learning (PBL) Management"],
    },
    {
      id: 8,
      title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
      issuer: "Microsoft",
      date: "Not specified",
      type: "Generative AI",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "66d15cd3a731b481d21d408b9d4ad21981e7120fe32bcadc00f0734e4ab45170",
      skills: ["Artificial Intelligence (AI)", "Generative AI", "Microsoft Copilot", "Responsible AI"],
    },
    {
      id: 9,
      title: "LLM Engineer",
      issuer: "VirtAI Tech (Qudong Technology)",
      date: "Not specified",
      type: "AI Engineering",
      icon: Star,
      color: "bg-chart-3/20 text-chart-3",
      credential: "DWLLME0006341",
      skills: ["Large Language Models (LLM)"],
    },
    {
      id: 10,
      title: "Large Language Model (LLM) Development Engineer",
      issuer: "Inspur Group",
      date: "Not specified",
      type: "AI Development",
      icon: Award,
      color: "bg-chart-4/20 text-chart-4",
      credential: "Not specified",
      skills: ["Large Language Models (LLM)", "Machine Learning", "Image Captioning (Computer Vision + NLP)"],
    },
    {
      id: 11,
      title: "Agent Engineering Competency Certification",
      issuer: "Ant Group",
      date: "Not specified",
      type: "AI Agent",
      icon: GraduationCap,
      color: "bg-chart-5/20 text-chart-5",
      credential: "DWAA009108",
      skills: ["AI Agent Development", "Prompt Engineering", "Workflow Automation"],
    },
    {
      id: 12,
      title: "AI Agent Engineer",
      issuer: "ModelScope",
      date: "Not specified",
      type: "AI Agent",
      icon: Star,
      color: "bg-primary/20 text-primary",
      credential: "DWAE021235",
      skills: ["AI Agent Development", "Prompt Engineering", "Autonomous Systems", "Task Automation Workflow", "Design LLM Integration"],
    },
    {
      id: 13,
      title: "Innovating with Google Cloud AI",
      issuer: "Google Cloud Skills Boost",
      date: "April 2026",
      type: "Cloud AI",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "10088405",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "AI-Driven Business Transformation"],
    },
    {
      id: 14,
      title: "Generative AI Studio",
      issuer: "Google Cloud Skills Boost",
      date: "April 2026",
      type: "Generative AI",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "10088037",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "AI-Powered Creativity", "Problem Solving"],
    },
    {
      id: 15,
      title: "Databricks for Machine Learning",
      issuer: "Databricks",
      date: "Not specified",
      type: "Machine Learning",
      icon: Star,
      color: "bg-chart-3/20 text-chart-3",
      credential: "10087864",
      skills: ["Machine Learning Pipelines (End-to-End ML Development)", "Big Data Processing (with Apache Spark)", "Cloud-Based ML", "Data Engineering", "Machine Learning"],
    },
    {
      id: 16,
      title: "Six Sigma Yellow Belt (SSYB)",
      issuer: "6sigmastudy - The global certification body for six sigma certifications",
      date: "Not specified",
      type: "Quality Management",
      icon: Award,
      color: "bg-chart-4/20 text-chart-4",
      credential: "1157737",
      skills: ["Continuous Process Improvement", "Analytical Skills", "Quality Management (Six Sigma)"],
    },
    {
      id: 17,
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "Not specified",
      type: "Cloud AI",
      icon: GraduationCap,
      color: "bg-chart-5/20 text-chart-5",
      credential: "103445598OCI25AICFA",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "Oracle Cloud Infrastructure (OCI) AI Applications", "Generative AI & Deep Learning Concepts", "LLMs"],
    },
    {
      id: 18,
      title: "Introduction to Prompt Engineering with GitHub Copilot",
      issuer: "Microsoft",
      date: "Not specified",
      type: "AI Engineering",
      icon: Star,
      color: "bg-primary/20 text-primary",
      credential: "10087388",
      skills: ["Prompt Engineering", "AI-Assisted Coding", "Code Optimization & Debugging"],
    },
    {
      id: 19,
      title: "Project Management Essentials Certified (PMEC)",
      issuer: "Management & Strategy Institute",
      date: "Not specified",
      type: "Project Management",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "Not specified",
      skills: ["Project Management"],
    },
    {
      id: 20,
      title: "Scrum Fundamentals Certified (SFC)",
      issuer: "SCRUMstudy Italia",
      date: "April 2026",
      type: "Agile Management",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "1157723",
      skills: ["Project Management", "Agile Scrum Framework", "Team Collaboration & Agile Communication", "Iterative Project Delivery & Workflow Management"],
    },
    {
      id: 21,
      title: "Project Management 101",
      issuer: "Simplilearn",
      date: "Not specified",
      type: "Project Management",
      icon: Star,
      color: "bg-chart-3/20 text-chart-3",
      credential: "Not specified",
      skills: ["Project Management", "Project Planning", "Risk Management", "Stakeholder Communication & Team Coordination", "Problem Solving"],
    },
    {
      id: 22,
      title: "Create Image Captioning Models",
      issuer: "Google Cloud Skills Boost",
      date: "Not specified",
      type: "Deep Learning",
      icon: Award,
      color: "bg-chart-4/20 text-chart-4",
      credential: "Not specified",
      skills: ["Deep Learning", "CNN & RNN (Neural Networks)", "Image Captioning (Computer Vision + NLP)"],
    },
    {
      id: 23,
      title: "HCIA-Security V4.0",
      issuer: "Huawei",
      date: "Not specified",
      type: "Cybersecurity",
      icon: GraduationCap,
      color: "bg-chart-5/20 text-chart-5",
      credential: "EBG20260411020628",
      skills: ["Network Security", "Firewalls", "VPN & Encryption Technologies (IPSec, SSL, PKI)", "Cybersecurity"],
    },
    {
      id: 24,
      title: "Prompt Engineering & Programming with OpenAI",
      issuer: "Columbia University",
      date: "Not specified",
      type: "AI Programming",
      icon: Star,
      color: "bg-primary/20 text-primary",
      credential: "Not specified",
      skills: ["Artificial Intelligence (AI)", "Machine Learning", "Large Language Models (LLM)", "OpenAI API"],
    },
    {
      id: 25,
      title: "Project Management Professional (PMP)",
      issuer: "Simplilearn",
      date: "Not specified",
      type: "Project Management",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "Not specified",
      skills: ["Project Management", "Project Planning", "Cost Control", "Critical Thinking"],
    },
    {
      id: 26,
      title: "HCIA-AI V4.0",
      issuer: "Huawei",
      date: "April 2026",
      type: "Artificial Intelligence",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "ICT20260410000800",
      skills: ["Machine Learning", "Artificial Intelligence (AI)"],
    },
    {
      id: 27,
      title: "MASTERCLASS ON ARTIFICIAL INTELLIGENCE",
      issuer: "ITCILO",
      date: "Not specified",
      type: "Artificial Intelligence",
      icon: Star,
      color: "bg-chart-3/20 text-chart-3",
      credential: "Not specified",
      skills: ["Artificial Intelligence (AI)"],
    },
    {
      id: 28,
      title: "NexG GodamLah! 2.0 Smart ID Hackathon",
      issuer: "Kolaxus - Innovation & Collaboration",
      date: "December 2025 (Expired January 2026)",
      type: "Hackathon",
      icon: Award,
      color: "bg-chart-4/20 text-chart-4",
      credential: "Not specified",
      skills: ["Project Management", "Systems Design", "Architectural Design", "Mobile Application Development", "User Interface Design", "Design Method"],
    },
    {
      id: 29,
      title: "5G Pioneers program",
      issuer: "Ericsson",
      date: "December 2025",
      type: "5G Technology",
      icon: GraduationCap,
      color: "bg-chart-5/20 text-chart-5",
      credential: "ceef6e0f-743d-4e3c-aad4-4d6ee0ce8bce",
      skills: ["Internet of Things (IoT)", "Blockchain", "Machine Learning", "Cybersecurity", "Artificial Intelligence (AI)", "Cloud Computing"],
    },
    {
      id: 30,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      date: "June 2025",
      type: "Networking",
      icon: Star,
      color: "bg-primary/20 text-primary",
      credential: "Not specified",
      skills: ["Networking", "Project Management", "Strategic Communications", "Financial Analysis"],
    },
    {
      id: 31,
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "August 2024",
      type: "Cybersecurity",
      icon: Award,
      color: "bg-chart-1/20 text-chart-1",
      credential: "Not specified",
      skills: ["Cybersecurity"],
    },
    {
      id: 32,
      title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "May 2025",
      type: "Cloud Computing",
      icon: GraduationCap,
      color: "bg-chart-2/20 text-chart-2",
      credential: "Not specified",
      skills: ["Project Management", "Amazon Web Services (AWS)", "Strategic Planning", "Cloud Computing"],
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "NexG GodamLah! 2.0 Smart ID Hackathon - Team Lead",
      organization: "Kolaxus - Innovation & Collaboration",
      description: "Led team in hackathon competition focused on smart ID solutions, demonstrating leadership in systems design, architectural design, mobile application development, and user interface design.",
      date: "December 2025",
      icon: Trophy,
    },
    {
      id: 2,
      title: "5G Pioneers Program Graduate",
      organization: "Ericsson Telecommunications Inc.",
      description: "Successfully completed advanced program covering Internet of Things (IoT), Blockchain, Machine Learning, Cybersecurity, Artificial Intelligence (AI), and Cloud Computing technologies.",
      date: "December 2025",
      icon: Award,
    },
    {
      id: 3,
      title: "Game Designer - Sotong Game Event 2025",
      organization: "Asia Pacific University (APU)",
      description: "Recognized for creative game design and development skills in university gaming event, showcasing innovation in interactive entertainment design.",
      date: "2025",
      icon: Star,
    },
    {
      id: 4,
      title: "Co-Organizer – Workplace Professional Skills Event 2026",
      organization: "Asia Pacific University (APU)",
      description: "Successfully organized and coordinated professional development event, demonstrating leadership and event management capabilities.",
      date: "2026",
      icon: Award,
    },
    {
      id: 5,
      title: "AI Untuk Rakyat Program Participant",
      organization: "Government Initiative Program",
      description: "Selected participant in government AI initiative program, contributing to national artificial intelligence development and community impact projects.",
      date: "2024",
      icon: Star,
    },
    {
      id: 6,
      title: "MSSD Klang Ping Pong Tournament Representative",
      organization: "SMK Raja Lumu",
      description: "School's Chief Representative in district-level ping pong competition, demonstrating athletic excellence and school representation.",
      date: "2022",
      icon: Trophy,
    },
    {
      id: 7,
      title: "Head of Prefect Discipline Leadership Award",
      organization: "SMK Raja Lumu",
      description: "Recognized for outstanding leadership in student discipline management and successful organization of Prefects' Strengthening Camp.",
      date: "2022-2024",
      icon: Award,
    },
    {
      id: 8,
      title: "Vice Chairman Excellence - Malaysian Red Crescent Society",
      organization: "SMK Raja Lumu",
      description: "Acknowledged for exceptional leadership in community service, first aid training, and member development within the Red Crescent Society.",
      date: "2022-2023",
      icon: Star,
    },
  ];

  const education = [
    {
      degree: "Bachelor's degree",
      field: "Computer Software Engineering",
      institution: "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      year: "July 2025 - July 2027",
      honors: "Second Upper",
      gpa: "CGPA: Second Upper",
      activities: "Co-Organizer – Workplace Professional Skills Event 2026 · Team Lead – Hackathon (2025–2026) · Game Designer – Sotong Game Event 2025",
      skills: ["Project Management", "Software Engineering"],
    },
    {
      degree: "Bachelor's degree",
      field: "Computer Software Engineering",
      institution: "De Montfort University (UK)",
      year: "July 2025 - July 2027",
      honors: "Second Upper",
      gpa: "CGPA: Second Upper",
      activities: null,
      skills: ["Project Management", "Software Engineering"],
    },
    {
      degree: "Diploma",
      field: "Information Technology",
      institution: "Tunku Abdul Rahman University of Management and Technology",
      year: "June 2023 - June 2025",
      honors: "Second Upper",
      gpa: "CGPA: Second Upper",
      activities: "Buddhist Society – Member · Basketball Club – Member",
      skills: ["Project Management", "Information Technology"],
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
              Certifications & Achievements
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A testament to my commitment to continuous learning and professional excellence. 
              Each certification and achievement represents dedication to mastering my craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic foundation in design and creative arts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-primary font-medium mb-3">{edu.field}</p>
              <p className="text-muted-foreground font-medium mb-2">{edu.institution}</p>
              <p className="text-sm text-muted-foreground mb-4">{edu.year}</p>
              
              {edu.activities && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Activities and Societies</p>
                  <p className="text-sm text-muted-foreground">{edu.activities}</p>
                </div>
              )}

              {edu.skills && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {edu.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 bg-accent/20 text-accent-foreground rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <span className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
                  {edu.honors}
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {edu.gpa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Certifications
            </h2>
            <p className="text-muted-foreground text-lg">
              Industry-recognized credentials demonstrating expertise and specialized skills
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className={`w-14 h-14 ${cert.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full w-fit mb-3">
                      {cert.type}
                    </span>

                    <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                    <p className="text-muted-foreground font-medium mb-2">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground mb-4">{cert.date}</p>

                    {cert.skills && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs px-2 py-1 bg-accent/20 text-accent-foreground rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Credential ID</p>
                      <p className="text-sm font-mono break-all">{cert.credential}</p>
                    </div>

                    <a 
                      href="https://www.linkedin.com/in/cho-sin-hong-9139a3378/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                    >
                      View credential
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Awards & Recognition
          </h2>
          <p className="text-muted-foreground text-lg">
            Honors received for excellence in design and creative work
          </p>
        </motion.div>

        <div className="space-y-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-chart-5 to-chart-3 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-primary font-medium">{achievement.date}</span>
                    <h3 className="text-xl md:text-2xl font-semibold mt-1 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground font-medium mb-3">
                      {achievement.organization}
                    </p>
                    <p className="text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
