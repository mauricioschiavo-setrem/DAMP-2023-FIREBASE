import { useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useGlobalContext } from '../context/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Task {
  title: string;
  completed: boolean;
  id: string;
}

export default () => {
  const router = useRouter();
  const { userId, setUserId } = useGlobalContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const docRef = collection(db, `users/${userId}/tasks`);

  function handleSignout() {
    setUserId('');
    router.push('/login');
  }

  return (
    <>
      <h1>Lista {userId}</h1>
      <Link href="/login">Login</Link>
      <a href="#" onClick={handleSignout}>
        Sair
      </a>
      <ul>
        <li>Item</li>
      </ul>
    </>
  );
};
