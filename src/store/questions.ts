import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Question } from '../types'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  reset: () => void
}

// Middleware in zustan 👇🏻
// function logger(config) {
//   return (set, get, api) => {
//     return config(
//       (...args) => {
//         console.log('appying', args)
//         set(...args)
//         console.log('new state', get())
//       },
//       get,
//       api
//     )
//   }
// }
const API_URL = import.meta.env.PROD
  ? 'https://quiz-app-m.vercel.app/'
  : 'http://localhost:5173/'

export const useQuestionsStore = create<State>()(
  // logger(
  persist(
    // 👆🏻 Es para persistir el estado en localStorage
    (set, get) => {
      return {
        questions: [],

        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
          const res = await fetch(`${API_URL}/data.json`)
          const json = await res.json()

          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()

          const newQuestions = structuredClone(questions)

          // Encuntra que question es, si lo encunetra da el indice y si no da -1
          const questionIndex = newQuestions.findIndex(
            (question: Question) => question.id === questionId
          )

          // Recuperamos la info de la question
          const questionInfo = newQuestions[questionIndex]

          //Verificar si la respuesta del usuario dio es correcta con la respuets del json de la question
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

          // Añadimos la info de la question (userSelectedAnswer: cual fue la posicion de la respuesta, isCorrectUserAnswer: tru o false)
          newQuestions[questionIndex] = {
            ...questionInfo,
            userSelectedAnswer: answerIndex,
            isCorrectUserAnswer
          }

          set({ questions: newQuestions })
        },

        nextQuestion: () => {
          const { questions, currentQuestion } = get()
          const nextQuestion = currentQuestion + 1

          if (currentQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },

        previousQuestion: () => {
          const { currentQuestion } = get()
          const previousQuestion = currentQuestion - 1

          if (currentQuestion >= 0) {
            set({ currentQuestion: previousQuestion })
          }
        },

        reset: () => {
          set({ questions: [], currentQuestion: 0 })
        }
      }
    },
    {
      name: 'questions'
      // getStorage: ()=>localStorage.getItem()
    }
  )
)
// )
