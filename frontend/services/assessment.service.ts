import { api } from '@/lib/api'

export interface QuizQuestionSchema {
  id: string
  nodeId: string
  question: string
  questionType: 'mcq' | 'short' | 'long' | 'extract' | 'competency'
  options?: string[]
  correctAnswer: string
  explanation?: string
  marks: number
  markingScheme?: string
  difficulty: string
}

export interface QuizAnswerRequest {
  questionId: string
  answer: string
  timeTakenSeconds?: number
}

export interface QuizAnswerResponse {
  isCorrect: boolean
  correctAnswer: string
  explanation?: string
  marksAwarded: number
  updatedMastery: number
}

export interface ExamSchema {
  examId: string
  title: string
  board: string
  classLevel: number
  subject: string
  duration: number
  totalMarks: number
  sections: number
  difficulty: string
  topics: string[]
  attempts: number
  bestScore: number | null
}

export interface ExamDetailSchema extends Omit<ExamSchema, 'sections'> {
  sections: ExamSectionSchema[]
}

export interface ExamListResponse {
  exams: ExamSchema[]
}

export interface ExamQuestionSchema {
  id: string
  question: string
  options?: string[]
  marks: number
  type: 'mcq' | 'short' | 'long' | 'extract' | 'competency'
}

export interface ExamSectionSchema {
  sectionId: string
  title: string
  marks: number
  questionCount: number
  questionType: string
  instructions: string
  questions: ExamQuestionSchema[]
}

export interface ExamSubmissionRequest {
  examId: string
  answers: { questionId: string; answer: string; timeTakenSeconds?: number }[]
}

export interface ExamResultSchema {
  totalScore: number
  maxScore: number
  percentage: number
  timeTaken: number
  sectionScores: { sectionId: string; score: number; maxScore: number }[]
  topicScores: { nodeId: string; conceptName: string; correct: number; total: number }[]
  weaknessAreas: { nodeId: string; conceptName: string; masteryProbability: number; recommendedAction: string }[]
}

export const assessmentService = {
  getQuizQuestions: (nodeId: string, count?: number) =>
    api.get<QuizQuestionSchema[]>(
      `/api/assessment/quiz/${nodeId}${count ? `?count=${count}` : ''}`
    ),

  submitQuizAnswer: (data: QuizAnswerRequest) =>
    api.post<QuizAnswerResponse>('/api/assessment/quiz/answer', data),

  getExams: (board?: string, classLevel?: number) =>
    api.get<ExamListResponse>(
      `/api/assessment/exams${board ? `?board=${board}` : ''}${classLevel ? `${board ? '&' : '?'}classLevel=${classLevel}` : ''}`
    ),

  getExam: (examId: string) =>
    api.get<ExamDetailSchema>(`/api/assessment/exams/${examId}`),

  submitExam: (data: ExamSubmissionRequest) =>
    api.post<ExamResultSchema>(`/api/assessment/exams/${data.examId}/submit`, data),

  getExamResult: (attemptId: string) =>
    api.get<ExamResultSchema>(`/api/assessment/attempts/${attemptId}`),

  getExamAttempts: (examId?: string) =>
    api.get<{ attempts: ExamResultSchema[] }>(
      `/api/assessment/attempts${examId ? `?examId=${examId}` : ''}`
    ),

  gradeAnswerSheet: (formData: FormData) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/assessment/grade`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
      },
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error('Grading failed')
      return res.json()
    }),
}
