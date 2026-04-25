export interface Video {
  title: string
  youtubeId: string
  duration: string
}

export interface QuizQuestion {
  q: string
  options: string[]
  correct: number
  explanation: string
}

export interface CourseConfig {
  slug: string
  title: string
  shortTitle: string
  description: string
  icon: string
  gradient: string
  accentColor: string
  bgGradient: string
  videos: Video[]
  quizQuestions: QuizQuestion[]
  certificateSkills: string[]
  certificateDescription: string
  cheatSheets: { title: string; file: string }[]
}
