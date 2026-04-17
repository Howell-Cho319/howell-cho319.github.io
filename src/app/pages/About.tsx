import { motion } from "motion/react";
import { Briefcase, GraduationCap, Code, Palette, Coffee, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const experiences = [
    {
      year: "2025 - 2026",
      title: "Team Mentor – Competitions, Hackathons & Projects",
      company: "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      description: "Provided strategic mentorship to student teams in national and international competitions, hackathons, and project-based initiatives. Guided teams in project planning, technical development, prototyping, and presentation delivery to judges. Developed students' leadership, teamwork, problem-solving, and innovation skills through structured coaching. Fostered collaboration, academic excellence, and a culture of innovation within teams.",
    },
    {
      year: "Feb 2025 - Dec 2025",
      title: "Research Assistant",
      company: "Monash University Malaysia · Part-time (Remote)",
      description: "Assisted in research by supporting data preparation, implementing machine learning workflows, and contributing to project documentation and reporting. Gained experience in data analysis, data collection, in-depth research, and summarizing findings for internal reports and academic outputs. Chose to step away from the project to focus more on studies, examinations, competitions, and personal projects.",
    },
    {
      year: "Oct 2024 - Jan 2025",
      title: "Software (AI) Intern",
      company: "Aonic · Internship (Subang Jaya, Selangor, Malaysia)",
      description: "Focused on the development of AI-driven computer vision solutions for automated oil palm tree detection in aerial imagery. Contributed to the end-to-end pipeline covering dataset validation, annotation refinement, and scalable model training. Played a key role in building tools that enhanced detection accuracy, reduced preprocessing time, and streamlined workflow efficiency.",
    },
    {
      year: "2023 - 2024",
      title: "Coursework Assignment Leader",
      company: "Tunku Abdul Rahman University of Management and Technology",
      description: "Led project teams across all courses, coordinating assignments, delegating tasks, and ensuring timely submission. Guided team members in planning, research, and execution to achieve high-quality outcomes. Fostered collaboration, problem-solving, and academic excellence within teams.",
    },
    {
      year: "2022 - 2024",
      title: "Head of Prefect Discipline",
      company: "SMK Raja Lumu",
      description: "Co-organized the Prefects' Strengthening Camp. Managed disciplinary matters and leadership development programs for student prefects.",
    },
    {
      year: "2022 - 2023",
      title: "Vice Chairman – Malaysian Red Crescent Society (BSMM)",
      company: "SMK Raja Lumu",
      description: "Organized events to promote society engagement and community service. Conducted member training including drills and skill development. Taught basic first aid to enhance preparedness and safety awareness. Led marching and drill exercises to build discipline and coordination.",
    },
    {
      year: "2022 - 2023",
      title: "President of Ping Pong Club",
      company: "SMK Raja Lumu",
      description: "School's Chief Representative – Participated in MSSD Ping Pong Tournament. Led club activities and represented the school in sports competitions.",
    },
    {
      year: "2021 - 2023",
      title: "Member – Chinese Language Society",
      company: "SMK Raja Lumu",
      description: "Co-organized the Cultural Experience Exhibition, enhancing engagement and cultural awareness. Participated in society events and cultural activities. Assisted in organizing language workshops and community programs. Collaborated with members to promote Chinese language and culture on campus.",
    },
    {
      year: "2021 - 2023",
      title: "Member – English Language Committee",
      company: "SMK Raja Lumu",
      description: "Co-organized The Scrabble Competition, managing event logistics and participant coordination. Assisted in planning and executing language-related activities to promote English proficiency. Collaborated with committee members to enhance engagement and campus-wide participation.",
    },
    {
      year: "2021 - 2023",
      title: "Restaurant Worker",
      company: "Restaurant LanJie · Part-time",
      description: "Provided customer service and managed restaurant operations. Developed strong communication skills and work ethic through hands-on service industry experience.",
    },
    {
      year: "2019 - 2020",
      title: "Head of Student Safety and Prefect Supervision",
      company: "SMK Raja Lumu",
      description: "Role Safety & Work Allocation: Ensured that roles and tasks are assigned reasonably to maintain safety for students and prefects. Task Assignment & Delegation: Allocated and released tasks effectively to guarantee smooth operations and secure environments. Problem Guidance & Resolution: Provided support and guidance to address issues and help resolve conflicts or challenges.",
    },
    {
      year: "2018 - 2019",
      title: "School Prefect",
      company: "SMK Raja Lumu",
      description: "Maintained discipline and ensured the safety and well-being of students. Assisted in organizing school events, activities, and assemblies. Provided guidance and support to students, helping to resolve issues and conflicts. Acted as a role model, promoting responsibility, teamwork, and school values.",
    },
    {
      year: "2012 - 2017",
      title: "Head Student Librarian",
      company: "SJK(C) Pandamaran B",
      description: "Managed the school library and delegated tasks to student staff - overseeing daily operations, maintaining organization, and ensuring smooth workflow.",
    },
  ];

  const education = [
    {
      year: "July 2025 - July 2027",
      degree: "Bachelor's degree in Computer Software Engineering",
      institution: "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      description: "Double degree program in collaboration with De Montfort University (UK). Activities: Co-Organizer – Workplace Professional Skills Event 2026, Team Lead – Hackathon (2025–2026), Game Designer – Sotong Game Event 2025. Skills: Project Management, Software Engineering.",
    },
    {
      year: "July 2025 - July 2027",
      degree: "Bachelor's degree in Computer Software Engineering",
      institution: "De Montfort University (UK)",
      description: "Dual degree program in collaboration with Asia Pacific University. Focus on international software engineering standards and practices. Skills: Project Management, Software Engineering.",
    },
    {
      year: "June 2023 - June 2025",
      degree: "Diploma in Information Technology",
      institution: "Tunku Abdul Rahman University of Management and Technology",
      description: "Foundation in information technology with comprehensive programming and system analysis training. Activities: Buddhist Society – Member, Basketball Club – Member. Skills: Project Management, Information Technology.",
    },
  ];

  const skills = [
    { name: "Software Engineering", level: 90, icon: Code },
    { name: "Full-Stack Development", level: 85, icon: Palette },
    { name: "Artificial Intelligence (AI)", level: 80, icon: Coffee },
    { name: "Project Management", level: 100, icon: Briefcase },
    { name: "Team Leadership", level: 88, icon: Heart },
    { name: "Analytical Thinking", level: 92, icon: GraduationCap },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/30 via-background to-accent/20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Me
              </h1>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Double Degree Software Engineering Student | Asia Pacific University (APU) & De Montfort University (UK) | Full-Stack Development | Leadership & Project Management | AI for Real-World Solutions
                </h2>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                I'm a highly motivated Software Engineering student with a solid foundation in full-stack development and a growing passion for applying AI to solve real-world problems. I combine strong technical skills with proven leadership, not just as a contributor, but as someone who takes ownership, drives teams forward, and delivers results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Throughout my diploma studies, I consistently led and contributed to high-performing projects, taking initiative when it mattered and helping teams stay focused on impact. Now pursuing a double degree accredited by both APU and De Montfort University (UK), I'm deepening my expertise across software engineering, project management, and intelligent systems, while actively building real-world applications through both academic work and self-directed learning.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                What sets me apart is my ability to learn fast, think analytically, and work independently without losing sight of the bigger picture. I thrive at the intersection of technical problem-solving and collaborative execution, turning ideas into practical, scalable solutions.
              </p>
              <div className="bg-accent/10 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-primary mb-2">Currently exploring:</p>
                <p className="text-muted-foreground">AI integration in software systems, scalable architecture, and modern development workflows.</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm font-medium text-primary mb-2">Top Skills:</p>
                <p className="text-muted-foreground">Software Engineering · Full-Stack Development · Project Management · Artificial Intelligence (AI) · Analytical Thinking · Team Leadership</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="images\personal\howell_image_3.jpeg"
                  alt="About Howell"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            A blend of creative and technical abilities honed over years of practice
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Languages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Languages
          </h2>
          <p className="text-muted-foreground text-lg">
            Multilingual communication abilities for global collaboration
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Chinese", level: "Native or bilingual proficiency", percentage: 100 },
            { name: "Cantonese", level: "Full professional proficiency", percentage: 90 },
            { name: "Malay", level: "Full professional proficiency", percentage: 90 },
            { name: "English", level: "Professional working proficiency", percentage: 85 },
            { name: "Japanese", level: "Elementary proficiency", percentage: 40 },
          ].map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{language.name}</h3>
                <span className="text-sm text-muted-foreground">{language.percentage}%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{language.level}</p>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-chart-2 to-chart-4"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
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
              Professional Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              My journey through various roles and responsibilities
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-6 items-start">
                    {/* Timeline dot */}
                    <div className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center flex-shrink-0 relative z-10">
                      <Briefcase className="w-8 h-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8">
                      <span className="text-sm text-primary font-medium">{exp.year}</span>
                      <h3 className="text-xl font-semibold mt-2 mb-1">{exp.title}</h3>
                      <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
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
            Academic foundation and continuous learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm text-primary font-medium">{edu.year}</span>
              <h3 className="text-xl font-semibold mt-2 mb-1">{edu.degree}</h3>
              <p className="text-muted-foreground font-medium mb-3">{edu.institution}</p>
              <p className="text-muted-foreground text-sm">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
