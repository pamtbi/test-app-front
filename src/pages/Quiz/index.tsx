import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { getQuizQuestions, questionType } from '@/utils/getQuizQuestions';
import { link } from "@/utils/link";
import style from './style.module.sass';
import { useUser } from '@/providers/userProvider';
import { post } from '@/utils/post';

import {Button} from "@/components/Button"

type answerType = {
  question: string;
  answer: string;
};

export const LogoutButton = () => {
  const userProvider = useUser();
  return userProvider?.user && (
    <Button className={style.logoutButton} onClick={userProvider?.logout}>
      Вийти
    </Button>
  );
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<questionType>([]);
  const [index, setIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [answers, setAnswers] = useState<answerType[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const userProvider = useUser();

  const resetQuiz = () => {
    setIndex(0);
    setError('');
    setAnswers([]);
    setScore(null);
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuizQuestions(userProvider?.token);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [userProvider?.token])

  const activeQuestion = useMemo(() => {
    return questions[index];
  }, [questions, index]);

  const nextQuestion = () => {
    if (answers[index]) {
      setError('');
      setIndex((prev) => prev + 1);
    } else {
      setError('Ви не вибрали відповідь!');
    }
  };

  const prevQuestion = () => {
    setIndex((prev) => prev - 1);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = {
        question: activeQuestion?.question,
        answer: e.target.value
      };
      return newAnswers;
    });
  }

  const submitQuiz = async () => {
    const { response, data }: { response: Response | null; data: { score?: number; message?: string } } =
      await post(link('/api/quiz/submit'), { answers });

    if (response?.ok) {
      setScore(data.score || 0);
    } else {
      setError(data.message || 'Щось пішло не так');
    }
  }

  if(score !== null) {
    let word = "";
    if(score === 1) word = "бал";
    else if(score > 1 && score < 5) word = "бали";
    else word = "балів";
    return (
      <div className={style.container}>
        <h1>Ваша оцінка: {score} {word}</h1>
        <Button onClick={resetQuiz}>Хочу пройти знову</Button>
      </div>
    )
  }

  return (
    <div className={style.container}>
      <div className={style.question}>
        <h1>Ласкаво просимо {userProvider?.user?.username}</h1>
        <h3 className={style.questionText}>{activeQuestion?.question}</h3>
        <ul className={style.options}>
          {activeQuestion?.options.map((opt, j) => {
            const id = `question-${j}-${index}`;
            return (
              <label key={j} className={style.option} htmlFor={id}>
                <input
                  checked={answers[index]?.answer === opt}
                  onChange={onChange}
                  type="radio"
                  name={`question-${index}`}
                  id={id}
                  value={opt}
                />
                <span>{opt}</span>
              </label>
            )
          })}
        </ul>

        <div className={style.buttons}>
          {index > 0 && <button className={style.button} onClick={prevQuestion}>Назад</button>}
          {index < questions.length - 1 && (
            <Button onClick={nextQuestion}>Далі</Button>
          )}
        </div>

        {answers.length === questions.length && index === questions.length - 1 && (
          <Button onClick={submitQuiz}>Завершити</Button>
        )}
        
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
}
