import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const blogPosts = [
    {
      id: 1,
      title: "Where My Inspiration Came From",
      excerpt: "A glimpse into the personal inspiration that drives my creativity and passion for building meaningful projects.",
      date: "April 20, 2026",
      readTime: "2 min read",
      category: "Personal",
      image: "/images/materials/couplediary.jpeg",
      fullContent: `Behind every creative journey, there's always a source of inspiration that keeps us motivated and grounded. For me, that inspiration comes from someone very special in my life.

This photo represents more than just a moment captured in time - it's a reminder of why I strive to build meaningful projects and create solutions that can make a positive impact. Having someone who believes in your dreams and supports your journey makes all the difference in the world.

Whether I'm working late on a coding project, preparing for competitions, or tackling complex AI problems, knowing that I have this constant source of encouragement and love gives me the strength to push through challenges and reach for bigger goals.

Sometimes the most powerful motivation comes not from professional achievements or academic success, but from the simple desire to make someone proud and to build a future together.

This is where my inspiration came from, and it continues to drive everything I do.

#Inspiration #PersonalJourney #Motivation #Love #Dreams`,
    },
    {
      id: 2,
      title: "Empowering Future Software Engineers Through Industry Insights",
      excerpt: "Illustration inspired by the journey of young professionals navigating internships, career growth, and AI-driven workplaces in 2026. Discussion with Ms. Cheryl Soh and Ms. Dharshini Nelamagan from PeopleLAKE Group about the importance of internships and career development.",
      date: "March 18, 2026",
      readTime: "8 min read",
      category: "Career Insights",
      image: "/images/content/content1.jpg",
      fullContent: `Cho Sin Hong
Double Degree Student in Software Engineering | Asia Pacific University (APU) & De Montfort University (UK). | Leadership and Project Management Skills | Actively Learning AI for Real-World Tech Solutions

March 18, 2026

I was honored to have the opportunity during the event to have an in-depth discussion with Ms. Cheryl Soh and Ms. Dharshini Nelamagan from PeopleLAKE Group, learning from their valuable experience, about the importance of internships. We discussed the challenges that young professionals face today, including how the timing of internships can affect talent retention and the differences between short-term internships in March-April and standard six-month programs.

Internships, one of the best ways to connect what students learn at university with real-world work experience. For many students, starting an internship is a significant step forward, a chance to improve technical skills and apply knowledge in practice. In other words, internships allow students to take their abilities to a higher level than classroom learning alone can provide.

Most universities offer internships that last three to four months, but some provide six-month programs. Longer internships give students more time to work on company projects, explore opportunities, and gain hands-on experience. Short-term internships, while common, can limit learning and even cause companies to miss out on talented individuals because students are unable to join the companies they aspire to.

In my view, young professionals today face constant pressure from interviews and potential rejections, which is a natural part of career growth. Interviews are only a small part of life and should not be seen as overwhelming pressure. Instead, they are valuable opportunities for interns to share their perspectives, demonstrate technical skills, and contribute innovative ideas. The fresh ideas brought by interns can help a company progress, whether practical or creative. It is perfectly acceptable to admit when you do not know something - everyone is continuously learning and improving.

I have also heard from many friends who feel lost, pressured, and unsure of their direction or life goals. In my opinion, having a personal life goal is fundamental. It is very important to identify areas of interest within what you are learning. For example, giving yourself a year to deeply learn and master one skill can help you understand whether you truly enjoy and fit the field. If you discover it isn't the right fit, that's okay, we can spend another year exploring, and another, and another. There is still plenty of time to make mistakes and learn from them - nothing to lose.

A particularly interesting insight I gained is the importance of continually expanding one's knowledge to strive for "understanding everything" as much as possible. In this era of artificial intelligence, this is easier than ever, as much of the knowledge is literally at our fingertips. In today's world, academic grades are no longer the main measure of selection, they are just a most basic point for having the entrance ticket for interviewing. What truly matters is a person's ability to execute, their knowledge, and the work they produce. Continuously creating and releasing high-quality work, planning, completing, and publishing projects is key. This is a rapidly evolving era, if you are not active, you risk being left behind. - success depends on execution.

In the fast-evolving era of 2026, especially with AI playing a transformative role, one key quality for entering the workplace can be summed up in a single word "Adaptability". A broad and versatile knowledge base is essential, as it allows interns to navigate different work environments, switch smoothly between various project tasks, and efficiently use AI tools to learn and master new skills. When adaptability is combined with a mindset of continuous learning, it ensures that interns can fully leverage their internship experience and succeed in dynamic, fast-paced professional settings.

I would like to sincerely thank Ms. Cheryl Soh and Ms. Dharshini Nelamagan for sharing their valuable insights and experience, which have inspired me to keep learning, improving, and applying knowledge in practice.

#APU #FutureSoftwareEngineers #CareerTalk #Teamwork #EducationForward #IndustryTalk`,
    },
    {
      id: 3,
      title: "Coffee Shop Coding Sessions",
      excerpt: "Finding the perfect balance between caffeine, creativity, and productive coding sessions.",
      date: "April 10, 2026",
      readTime: "3 min read",
      category: "Life",
      image: "/images/content/content2.jpg",
      fullContent: `There's something magical about coding in a coffee shop. The gentle hum of conversations, the aroma of freshly brewed coffee, and the soft background music create an atmosphere that somehow enhances my focus and creativity.

I've discovered that my most productive coding sessions often happen in these cozy spaces. Maybe it's the change of environment from my usual desk setup, or perhaps it's the subtle energy of people around me pursuing their own goals and projects.

My go-to order is usually a medium cappuccino - enough caffeine to keep me alert but not so much that I get jittery while typing. I've learned that timing is everything; arriving during the mid-morning lull means I can secure a good spot with power outlets and stable WiFi.

The ambient noise level is perfect for concentration. Unlike the complete silence of a library, which can feel isolating, or the chaos of a busy office, coffee shops provide just the right amount of background activity to keep my mind engaged without being distracted.

I've also found that taking regular breaks to observe the world around me - watching people come and go, overhearing snippets of conversations, seeing the baristas craft each drink with care - often sparks new ideas for my projects.

Some of my best debugging breakthroughs have happened while staring out the window with a warm cup in my hands, letting my subconscious work on the problem while my conscious mind takes a rest.

#CoffeeShopCoding #ProductivityTips #DeveloperLife #CreativeSpaces`,
    },
    {
      id: 4,
      title: "Building My First AI Project",
      excerpt: "Lessons learned while developing my first machine learning application and the challenges I faced.",
      date: "April 5, 2026",
      readTime: "7 min read",
      category: "Technology",
      image: "/images/content/content3.jpg",
      fullContent: `Building my first AI project was both exhilarating and humbling. What started as a simple image classification task quickly became a deep dive into the complexities of machine learning, data preprocessing, and model optimization.

The project was a plant disease detection system for my university coursework. The goal seemed straightforward: train a model to identify diseases in crop images. However, I quickly learned that "simple" and "machine learning" rarely go together.

Data Collection Challenges
The first hurdle was gathering quality training data. I spent weeks collecting images, only to realize that many were poorly lit, incorrectly labeled, or didn't represent real-world conditions. This taught me that data quality is far more important than data quantity.

Model Selection and Training
After researching various architectures, I settled on a modified ResNet model. The training process was a rollercoaster - watching accuracy climb during good epochs and plummet during bad ones. I learned patience and the importance of proper validation techniques.

Real-World Testing
The moment of truth came when testing with fresh images. My model, which achieved 95% accuracy on test data, struggled with real-world photos taken under different lighting conditions. This was my first lesson in the gap between laboratory conditions and practical applications.

Key Takeaways
1. Start simple and iterate
2. Spend more time on data quality than model complexity
3. Always test in real-world conditions
4. Documentation is crucial for future improvements

This project taught me that AI development is as much about understanding the problem domain as it is about coding algorithms. Every failure was a learning opportunity that made the eventual success even more rewarding.

#MachineLearning #AI #FirstProject #LessonsLearned #ComputerVision`,
    },
    {
      id: 5,
      title: "University Life and Learning",
      excerpt: "Reflections on my academic journey and how university shaped my perspective on technology.",
      date: "March 28, 2026",
      readTime: "6 min read",
      category: "Education",
      image: "/images/content/content4.jpg",
      fullContent: `University has been more than just a place to earn a degree - it's been a transformative journey that shaped how I think about technology, problem-solving, and my future career.

The Dual Degree Experience
Pursuing a dual degree between Asia Pacific University and De Montfort University has given me unique perspectives on software engineering from both Asian and Western educational approaches. The contrast in teaching methodologies has enriched my understanding and made me a more well-rounded developer.

Beyond the Classroom
While lectures provide the foundation, the real learning happens in group projects, hackathons, and late-night coding sessions with classmates. These experiences taught me collaboration, time management, and how to work under pressure - skills that no textbook can fully convey.

Mentorship and Leadership
Taking on leadership roles in various projects and societies has been incredibly rewarding. Mentoring junior students and organizing events has improved my communication skills and taught me the importance of giving back to the community.

Balancing Theory and Practice
University strikes a perfect balance between theoretical knowledge and practical application. Understanding algorithms and data structures in depth has made me a better programmer, while hands-on projects have shown me how to apply this knowledge to solve real problems.

Networking and Friendships
The relationships built during university extend far beyond academic collaboration. My classmates have become lifelong friends, study partners, and future professional connections. The diversity of backgrounds and perspectives has broadened my worldview significantly.

Preparing for the Future
University has taught me that learning never stops. The rapid pace of technological change means that the specific technologies I'm learning today might be obsolete tomorrow, but the problem-solving skills and learning methodologies will remain valuable throughout my career.

#UniversityLife #Education #SoftwareEngineering #PersonalGrowth #APU #DMU`,
    },
    {
      id: 6,
      title: "The Art of Problem Solving",
      excerpt: "How programming taught me to approach challenges systematically and think creatively.",
      date: "March 20, 2026",
      readTime: "8 min read",
      category: "Skills",
      image: "/images/content/content5.jpg",
      fullContent: `Programming has fundamentally changed how I approach problems, not just in code, but in every aspect of life. The systematic thinking required for software development has become a powerful tool for tackling challenges both technical and personal.

Breaking Down Complex Problems
The first lesson programming taught me was decomposition - breaking large, overwhelming problems into smaller, manageable pieces. Whether I'm debugging a complex algorithm or planning a major project, I now instinctively look for ways to divide the challenge into smaller components.

The Debug Mindset
Debugging code has taught me patience and methodical investigation. When something doesn't work, I've learned to:
- Reproduce the problem consistently
- Isolate variables and test assumptions
- Use systematic elimination to narrow down causes
- Document findings for future reference

This approach now extends to troubleshooting everything from technical issues to interpersonal conflicts.

Embracing Iteration
Programming has taught me that the first solution is rarely the best solution. The iterative process of writing, testing, refining, and optimizing code has made me comfortable with continuous improvement in all areas of life.

Pattern Recognition
After solving hundreds of coding problems, I've developed strong pattern recognition skills. I can quickly identify when a new problem resembles something I've solved before and adapt previous solutions. This skill transfers remarkably well to academic studies and project management.

Logical Thinking vs Creative Solutions
While programming demands logical, step-by-step thinking, it also requires creativity. Finding elegant solutions to complex problems often involves thinking outside conventional approaches. This balance between logic and creativity has enhanced my problem-solving toolkit significantly.

Handling Failure and Persistence
Every programmer knows the frustration of code that doesn't work. Programming has taught me that failure is not just acceptable - it's essential for learning. Each error message is feedback, each bug is a learning opportunity.

The systematic approach I've developed through programming has made me more confident in tackling unfamiliar challenges, knowing that with patience and methodology, most problems can be solved.

#ProblemSolving #Programming #CriticalThinking #Debugging #LogicalThinking`,
    },
    {
      id: 7,
      title: "Balancing Studies and Projects",
      excerpt: "Managing time between academic responsibilities and personal coding projects effectively.",
      date: "March 15, 2026",
      readTime: "4 min read",
      category: "Productivity",
      image: "/images/content/content6.jpg",
      fullContent: `Balancing academic coursework with personal coding projects has been one of my biggest challenges in university. Both are important for my growth as a developer, but finding the right balance requires careful planning and prioritization.

Time Management Strategies
I've developed a system that works for me:
- Time blocking: Dedicated hours for coursework vs. personal projects
- Priority matrix: Urgent vs. important tasks to guide daily decisions
- Weekly reviews: Assessing progress and adjusting plans accordingly

Academic Work as Foundation
I've learned to view my coursework not as a burden that takes time away from "real" projects, but as essential foundation building. The algorithms, data structures, and software engineering principles I learn in class directly improve my personal projects.

Personal Projects as Application
Conversely, personal projects allow me to apply classroom concepts in creative ways. Building a web application reinforces database concepts from my coursework, while contributing to open source projects teaches me about software collaboration and version control.

The Synergy Effect
When balanced properly, academic work and personal projects reinforce each other. A machine learning assignment might inspire a personal AI project, while a personal web development project might provide material for a software engineering case study.

Managing Burnout
The key is recognizing when to push forward and when to step back. I've learned to:
- Take regular breaks to prevent mental fatigue
- Vary the types of work to maintain interest
- Celebrate small wins in both academic and personal achievements
- Maintain social connections and hobbies outside of coding

Long-term Perspective
Both academic excellence and personal project experience are valuable for future career opportunities. Employers value candidates who can demonstrate both theoretical knowledge and practical application skills.

The balance isn't always perfect, and some weeks favor one over the other. The important thing is maintaining progress in both areas while preserving mental health and personal relationships.

#TimeManagement #StudentLife #PersonalProjects #AcademicSuccess #WorkLifeBalance`,
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
              My Personal Diary
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A collection of thoughts, experiences, and reflections from my journey. 
              Join me as I explore life, creativity, and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-accent/30 text-accent-foreground rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedPost(post.id)}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Modal for Full Content */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card border border-border rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold">
                {blogPosts.find(p => p.id === selectedPost)?.title}
              </h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {(() => {
                const post = blogPosts.find(p => p.id === selectedPost);
                if (!post) return null;
                
                return (
                  <div className="p-6">
                    {/* Header Image */}
                    <div className="aspect-[16/9] overflow-hidden bg-muted rounded-xl mb-6">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm px-3 py-1 bg-accent/30 text-accent-foreground rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Full Content */}
                    <div className="prose prose-lg max-w-none">
                      {post.fullContent?.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('#')) {
                          return (
                            <div key={index} className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                              {paragraph.split(' ').map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          );
                        }
                        return (
                          <p key={index} className="text-foreground leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
