# Cho Sin Hong (Howell Cho) - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing my journey as a Double Degree Software Engineering student at Asia Pacific University (APU) & De Montfort University (UK). Built with React, TypeScript, and Tailwind CSS, featuring real projects, certifications, professional experience, and personal insights.

## 🚀 Key Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite for optimal performance
- **Coffee/Ghibli Design Theme**: Warm, inviting aesthetic with coffee browns, cream, and sage green
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth animations, modals, and hover effects
- **Background Music System**: Auto-playing Howl's Moving Castle piano cover with global controls
- **Resume Viewer**: Full-screen modal with 7-page resume navigation
- **Real Portfolio Data**: 20+ actual projects with local portfolio images
- **Professional Content**: 32 certifications, real work experience, and academic achievements
- **Interactive Diary**: Personal blog with modal functionality for full content viewing
- **Academic Collaborations**: University partnership showcase with status indicators

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 4.1.12 with custom theme
- **Build Tool**: Vite 6.3.5 for fast development and building
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React Context for global music state
- **Routing**: React Router for client-side navigation
- **Audio**: HTML5 Audio API with custom controls

## 📁 Project Structure

```
├── public/
│   ├── images/           # Organized image assets
│   │   ├── content/      # Blog post images (7 images)
│   │   ├── personal/     # Personal photos (15+ images)
│   │   ├── materials/    # QR codes and materials (7 images)
│   │   ├── portfolio/    # Project screenshots (21 images)
│   │   ├── resume/       # Resume pages (7 PNG files)
│   │   └── universities/ # University logos (5 institutions)
│   └── music/           # Background music files
├── src/
│   └── app/
│       ├── components/   # Reusable React components
│       │   ├── ui/       # shadcn/ui component library (40+ components)
│       │   ├── figma/    # Custom image components
│       │   ├── Header.tsx    # Navigation with music controls
│       │   ├── Footer.tsx    # Social links and copyright
│       │   ├── Layout.tsx    # Main layout wrapper
│       │   └── MusicControls.tsx # Global music player
│       ├── contexts/     # React Context providers
│       │   └── MusicContext.tsx # Global music state
│       ├── pages/        # Main page components
│       │   ├── Home.tsx         # Hero, collaborations, resume viewer
│       │   ├── Blog.tsx         # Personal diary with modals
│       │   ├── About.tsx        # Experience, education, skills
│       │   ├── Portfolio.tsx    # 20+ real projects with filtering
│       │   ├── Certifications.tsx # 32 certifications + achievements
│       │   └── Contact.tsx      # Contact form, FAQ, Buy Me Coffee
│       └── routes.tsx    # Application routing configuration
└── styles/               # Global styles and custom CSS
    ├── index.css        # Tailwind imports
    ├── theme.css        # Custom color variables
    ├── fonts.css        # Typography definitions
    └── tailwind.css     # Tailwind configuration
```

## � Special Features

### Background Music System
- **Auto-Play**: Howl's Moving Castle piano cover starts on first user interaction
- **Global Controls**: Play/pause and volume controls in header
- **Persistent Playback**: Music continues across page navigation
- **Loop Functionality**: Automatic replay when song finishes
- **Browser Compliant**: Respects browser autoplay policies

### Resume Viewer
- **Full-Screen Modal**: Immersive resume viewing experience
- **7-Page Navigation**: CV.png + Resume1-6.png with page indicators
- **Scrollable Content**: Proper sizing for large resume images
- **Keyboard Navigation**: Arrow keys and ESC support
- **Mobile Optimized**: Touch-friendly navigation controls

### Interactive Elements
- **Modal System**: Diary entries open in full-screen modals
- **Smooth Animations**: Framer Motion transitions throughout
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Image Fallbacks**: Graceful handling of missing images
- **Loading States**: Proper loading indicators and error handling

## 📱 Pages Overview

### 🏠 Home
- **Hero Section**: Personal introduction with call-to-action
- **Resume Viewer**: Full-screen modal with 7-page navigation (CV + Resume 1-6)
- **Personal Diary Preview**: Latest diary entries with read more functionality
- **Academic Collaborations**: University partnerships (APU, DMU, TAR UMT, Aonic, Monash)
- **Contact Call-to-Action**: Direct link to collaboration opportunities

### 📖 Diary (Blog)
- **Personal Insights**: 6 meaningful diary entries including industry insights
- **Featured Entry**: "Where My Inspiration Came From" with personal photo
- **Modal Functionality**: Full content viewing with smooth animations
- **Professional Content**: Internship experiences, career advice, and personal growth

### 👤 About
- **Personal Story**: Comprehensive background as Double Degree student
- **Professional Experience**: 13 real experiences from 2012-2026
- **Skills Assessment**: Project Management (100%), AI, Full-Stack Development
- **Education**: APU & De Montfort University dual degree program
- **Languages**: 5 languages with proficiency levels (Cantonese, Chinese, English, Japanese, Malay)

### 💼 Portfolio
- **20+ Real Projects**: Actual projects from resume/CV with descriptions
- **Technology Filtering**: Filter by AI Development, System Development, etc.
- **Local Images**: Sequential portfolio images (portfolio1.png - portfolio21.png)
- **GitHub Integration**: All projects link to old GitHub (ChoSinHong)
- **Project Categories**: AI/ML, Web Development, Mobile Apps, System Design

### 🏆 Achievements (Certifications)
- **32 Actual Certifications**: Real certifications with LinkedIn links
- **Skills Tags**: Technology and skill categorization for each certification
- **Education Details**: University information with CGPA and "Second Upper" status
- **Awards & Recognition**: 8 real achievements including hackathon leadership
- **Activities**: University societies and leadership positions

### 📞 Contact
- **Contact Form**: Professional inquiry form with validation
- **Social Media**: LinkedIn, GitHub (old & new), Instagram integration
- **Buy Me a Coffee**: QR code integration with Touch 'n Go eWallet
- **Enhanced FAQ**: 6 impressive questions showcasing AI, project management, and technical skills
- **Professional Information**: Email, availability, and collaboration opportunities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Howell-Cho319/howell-cho319.github.io.git
   cd howell-cho319.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## � Real Data Integration

### Portfolio Projects (20+)
- **AI Development**: Object detection, computer vision, automation systems
- **System Development**: Full-stack applications, database management
- **Mobile Development**: Cross-platform mobile applications
- **Web Development**: Modern web applications with React/Vue.js
- **Academic Projects**: University coursework and research projects

### Professional Experience (13 Positions)
- **Leadership Roles**: Head Student Librarian, Student Representative, Team Mentor
- **Academic Positions**: University roles at APU, DMU, TAR UMT
- **Industry Experience**: Internships and professional development
- **Timeline**: 2012-2026 comprehensive career progression

### Certifications (32 Total)
- **Cloud Platforms**: AWS, Google Cloud, Microsoft Azure
- **Programming**: Python, JavaScript, Java, C++, React, Node.js
- **AI/ML**: Machine Learning, Deep Learning, Computer Vision
- **Project Management**: Agile, Scrum, Leadership certifications
- **Database**: SQL, NoSQL, Database Design and Management

### Academic Achievements
- **Double Degree Program**: APU (Malaysia) & De Montfort University (UK)
- **CGPA**: Second Upper classification
- **Awards**: 8 real achievements including hackathon leadership
- **Activities**: Multiple university societies and leadership positions

## 🖼️ Asset Management

### Image Organization
- **Content Images**: 7 blog post images in `/public/images/content/`
- **Personal Photos**: 15+ personal images in `/public/images/personal/`
- **Portfolio Screenshots**: 21 project images (`portfolio1.png` - `portfolio21.png`)
- **Resume Pages**: 7 high-quality resume images (`cv.png`, `resume1-6.png`)
- **University Logos**: 5 institution logos for collaboration section
- **Materials**: QR codes, diary images, and other assets

### Audio Assets
- **Background Music**: Howl's Moving Castle piano cover (MP4 format)
- **Optimized Playback**: Compressed for web delivery
- **Cross-Browser Support**: Compatible with all modern browsers

### Performance Optimization
- **Image Compression**: Optimized file sizes without quality loss
- **Lazy Loading**: Images load as needed for better performance
- **Fallback System**: Graceful handling of missing or failed image loads
- **Responsive Images**: Adaptive sizing for different screen resolutions

## 🎯 Key Technical Components

### Core Components
- **MusicContext**: Global state management for background music
- **MusicControls**: Persistent audio controls with volume and play/pause
- **ImageWithFallback**: Robust image component with error handling and loading states
- **Layout**: Consistent header, navigation, and footer across all pages
- **Modal System**: Reusable modal components for diary and resume viewing

### UI Component Library (40+ Components)
- **shadcn/ui Integration**: Complete UI component library with Radix UI primitives
- **Custom Styling**: Tailored to match coffee/Ghibli design theme
- **Accessibility**: WCAG compliant components with proper ARIA labels
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Animation System**: Smooth transitions and micro-interactions

### State Management
- **React Context**: Global music state and user preferences
- **Local State**: Component-level state for forms and interactions
- **URL State**: Router-based state for navigation and deep linking
- **Audio State**: Persistent music playback across page transitions

## 🌐 Deployment & Links

- **Live Website**: [howell-cho319.github.io](https://howell-cho319.github.io)
- **Repository**: [GitHub Repository](https://github.com/Howell-Cho319/howell-cho319.github.io)
- **Development**: Optimized for GitHub Pages deployment
- **CI/CD**: Automatic deployment on push to main branch

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About the Developer

**Cho Sin Hong (Howell Cho)**  
*Double Degree Software Engineering Student*  
*Asia Pacific University (APU) & De Montfort University (UK)*

### Contact Information
- **Email**: [howell.cho319@gmail.com](mailto:howell.cho319@gmail.com)
- **LinkedIn**: [cho-sin-hong-9139a3378](https://linkedin.com/in/cho-sin-hong-9139a3378)
- **GitHub (Current)**: [Howell-Cho319](https://github.com/Howell-Cho319)
- **GitHub (Legacy)**: [ChoSinHong](https://github.com/ChoSinHong)
- **Instagram**: [@howellcho](https://instagram.com/howellcho)

### Expertise
- **Full-Stack Development**: React, TypeScript, Node.js, Python
- **AI & Machine Learning**: Computer Vision, Object Detection, Automation
- **Project Management**: Agile methodologies, Team Leadership
- **Languages**: Cantonese (Native), Chinese (Native), English (Professional), Japanese (Elementary), Malay (Professional)

---

*Built with ❤️, ☕, and the magic of Studio Ghibli*  
*© 2026 Cho Sin Hong. All rights reserved.*