export interface Question {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number

  isCorrectUserAnswer?: boolean // para hacer un contador y saber cuantas respuestad correctas hay
  userSelectedAnswer?: number // respuesta del usuario
}
