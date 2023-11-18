export interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: number
  code: string
  userSelectedAnswers?: number
  isCorrectUserAnswers?: boolean
}
