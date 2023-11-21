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

export const useQuestionsStore = create<State>()(
  // logger(
  persist(
    // 👆🏻 Es para persistir el estado en localStorage
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/src/mocks/data.json')
          const json = await res.json()

          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()

          const newQuestions = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
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
