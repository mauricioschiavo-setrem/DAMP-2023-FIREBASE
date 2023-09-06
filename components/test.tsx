import { useEffect, useState } from 'react';
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

export default function Test() {
  const router = useRouter();
  const { userId, setUserId } = useGlobalContext();
  const [id, setId] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  //const docRef = collection(db, `users/${userId}/tasks`);

  useEffect(() => {
    setId(userId);
  }, [userId]);

  function handleSignout() {
    setUserId('');
    router.push('/login');
  }

  return (
    <>
      <h2>User {id}</h2>
      <Link href="/login">Login</Link>
      <a href="#" onClick={handleSignout}>
        Sair
      </a>
      <ul>
        <li>Item</li>
      </ul>
    </>
  );
}
