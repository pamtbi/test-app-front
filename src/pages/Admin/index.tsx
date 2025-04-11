import { useUser, User } from '@/providers/userProvider';
import { useState, useEffect } from 'react'
import { get } from '@/utils/get';
import { link } from '@/utils/link';
import style from "./style.module.sass"
import {formatDate} from "@/utils/formatDate"
import clsx from 'clsx';

import {Button} from "@/components/Button"
import {useModal} from "@/providers/modalProvider"

type answerType = {
  question: string;
  answer: string;
  _id: string;
  isCorrectAnswer: boolean;
}

const ShowBtn = ({setHidden, hidden}: {setHidden: React.Dispatch<React.SetStateAction<boolean>>, hidden: boolean}) => {
  return <Button onClick={() => setHidden((prev) => !prev)}>
    {hidden ? "Показати всі результати" : "Приховати результати"}
  </Button>
}

const Results = ({results}: {results: User['results']}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={style.results}>
      <span className={style.resultsTitle}>Результати: </span>
      {results?.length ? results.slice(0, hidden ? 1 : results.length).map(({date, score, _id, answers}) => {
        return (
          <div className={style.result} key={_id}>
            <div className={style.date}>Дата: {formatDate(date)}</div>
            <div className={style.score}>Бали: {score}</div>
            <div className={style.answers}>
              Відповіді: 
              {answers.length ? answers.map(({question, answer, _id, isCorrectAnswer}: answerType) => (
                <div className={clsx(style.answerWrapper, isCorrectAnswer && style.correct)} key={_id}>
                  <div className={style.question}>Питання: {question}</div>
                  <div className={style.answer}>Відповідь: {answer}</div>
                </div>
              )) : ""}
            </div>
          </div>
        )
      }) : "Нема результатів"}
      {results?.length && results.length > 1 ? (
        <ShowBtn setHidden={setHidden} hidden={hidden} />
      ) : (
        <Button className={style.singleResult}>Тільки один разультат</Button>
      )}
    </div>
  )
};

const Admin = () => {
  const userProvider = useUser();
  const [users, setUsers] = useState([]);
  const modal = useModal();

  useEffect(() => {
    if(userProvider?.token) {
      const fetchUsers = async () => {
        try {
          const { data } = await get(link('/api/admin/users'), userProvider?.token);
          setUsers(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUsers();
    }
  }, [userProvider?.token, modal?.message]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Ласкаво просимо, {userProvider?.user?.username}</h1>
      <h2 className={style.subtitle}>Список користувачів {users?.length ? `(${users.length})` : "порожній"}</h2>
      <div className={style.users}>
        {users?.length ? users.map(({username, id, results}: User) => {
          return (
            <div className={style.user} key={id}>
              <div className={style.username}>Им'я користувача: {username}</div>
              <Button onClick={() => {
                modal?.setId(id);
                modal?.setName(username);
                modal?.setOpen(true);
              }} className={style.deleteUser}>Видалити користувача</Button>
              <Results results={results}></Results>
            </div>
          )
        }) : ""}
      </div>
    </div>
    
  )
}

export default Admin;