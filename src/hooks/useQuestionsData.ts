import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((q) => {
    if (q.isCorrectUserAnswer) correct++
    else if (!q.isCorrectUserAnswer && q.isCorrectUserAnswer != null)
      incorrect++
    else unanswered++
  })
  return { correct, incorrect, unanswered }
}
