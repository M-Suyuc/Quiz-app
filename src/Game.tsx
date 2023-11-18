import { Card, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { Question as QuestionType } from './types'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card
      variant='outlined'
      sx={{ bgcolor: '#333', padding: 2, textAlign: 'left' }}
    >
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter
        language='javascript'
        style={gradientDark}
        customStyle={{ fontSize: '1rem' }}
      >
        {info.code}
      </SyntaxHighlighter>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
