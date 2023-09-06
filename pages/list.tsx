import { useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useGlobalContext } from '../context/Context';

interface Task {
  title: string;
  completed: boolean;
  id: string;
}

export default () => {
  const { userId } = useGlobalContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const docRef = collection(db, `users/${userId}/tasks`);

  return (
    <>
      <h1>Lista</h1>
      <ul>
        <li>Item</li>
      </ul>
    </>
  );
};
