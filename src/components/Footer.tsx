import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { useQuestionsData } from '../hooks/useQuestionsData'

export const Footer = () => {
  const reset = useQuestionsStore((state) => state.reset)
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Resetear juego</Button>
      </div>
    </footer>
  )
}
