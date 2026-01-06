# SkillsXAI - AI Education Platform

A modern, AI-themed Next.js website for SkillsXAI - an educational platform helping school students learn Workflow Automation & AI Agents.

## 🚀 Features

- **Modern AI-Themed Design**: Dark mode with blue/cyan gradients and glassmorphism effects
- **3D Visual Elements**: Interactive neural network and floating brain animations using Three.js
- **AI Chatbot**: Intelligent chatbot assistant to answer questions about courses
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Page transitions and micro-interactions using Framer Motion

## 📁 Project Structure

```
skillsxai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── activities/        # Activities/Curriculum page
│   │   ├── about/             # About Us page
│   │   ├── contact/           # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   └── components/
│       ├── 3d/                # Three.js 3D components
│       │   ├── NeuralNetwork3D.tsx
│       │   └── FloatingBrain3D.tsx
│       ├── chatbot/           # AI Chatbot component
│       │   └── Chatbot.tsx
│       ├── layout/            # Layout components
│       │   ├── Navbar.tsx
│       │   └── Footer.tsx
│       └── ui/                # UI components
│           └── ParticleBackground.tsx
├── public/                    # Static assets
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd skillsxai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Pages

### Home Page (/)
- Hero section with 3D neural network animation
- Course overview with feature cards
- Benefits section
- 3-day curriculum preview
- Testimonials
- Call-to-action

### Activities Page (/activities)
- Full curriculum details
- Interactive day tabs
- Expandable topic cards
- Learning outcomes

### About Page (/about)
- Mission and vision
- Company values
- Journey timeline
- Team members
- Statistics

### Contact Page (/contact)
- Contact form with validation
- Inquiry type selection
- FAQ section
- Contact information

## 🤖 AI Chatbot

The website includes an intelligent chatbot that can answer questions about:
- Course information
- Curriculum details
- Pricing and enrollment
- Age requirements
- Duration
- Contact information

## 🎨 Design Features

- **Dark Theme**: Modern dark background with gradient accents
- **Glassmorphism**: Semi-transparent cards with blur effects
- **Gradient Text**: Dynamic gradient typography
- **Particle Background**: Animated floating particles
- **3D Elements**: Interactive Three.js components
- **Smooth Transitions**: Framer Motion animations

## 📝 License

This project is proprietary to SkillsXAI.

## 📞 Contact

- Email: hello@skillsxai.com
- Phone: +1 (234) 567-890
