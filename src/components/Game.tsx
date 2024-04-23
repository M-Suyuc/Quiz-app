import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { Question as QuestionType } from '../types'
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Footer } from './Footer'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  const nextQuestion = useQuestionsStore((state) => state.nextQuestion)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
    nextQuestion()
  }

  const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    if (userSelectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === userSelectedAnswer) return 'red'
    return 'transparent'
  }

  return (
    <>
      <Card
        variant='outlined'
        sx={{ bgcolor: '#333', padding: 2, textAlign: 'left', marginTop: 5 }}
      >
        <Typography variant='h5' sx={{ fontSize: '1rem' }}>
          {info.question}
        </Typography>

        <SyntaxHighlighter
          language='javascript'
          style={xt256}
          customStyle={{ fontSize: '1rem' }}
        >
          {info.code}
        </SyntaxHighlighter>

        <List sx={{ bgcolor: '#333' }} disablePadding>
          {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(info, index) }}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const nextQuestion = useQuestionsStore((state) => state.nextQuestion)
  const previousQuestion = useQuestionsStore((state) => state.previousQuestion)

  const questionInfo = questions[currentQuestion]
  console.log(questionInfo)

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
      >
        <IconButton onClick={previousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={nextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
