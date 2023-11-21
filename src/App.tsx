import './App.css'
import { Container, Stack, Typography, useTheme } from '@mui/material'
import { JavaScriptLogo } from './components/JavaScriptLogo'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'
import useMediaQuery from '@mui/material/useMediaQuery'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  const theme = useTheme()
  const medium = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <main>
        <Container maxWidth='sm'>
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
            justifyContent='center'
          >
            <JavaScriptLogo />
            <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
              JavaScript Quiz
            </Typography>
          </Stack>
          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </Container>
      </main>
    </>
  )
}

export default App
