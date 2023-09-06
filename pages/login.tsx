import { useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';

export default () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUp, setSignUp] = useState<boolean>(true);
  const [helperText, setHelperText] = useState<string>('');
  const router = useRouter();

  const { userId, setUserId } = useGlobalContext();

  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHelperText('Carregando...');
    // sign up
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setHelperText('Congrats!, you can now Sign In');
        setTimeout(() => setHelperText(''), 2000);
        setSignUp(!signUp);
        // const userId = auth.currentUser?.uid
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode} ${errorMessage}`);
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHelperText('Criando conta...');
    // sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid); //this way, it is only a string and not string | undefined as before
        router.push('/list');
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode === 'auth/user-not-found!'
          ? setHelperText('Email is not registered!')
          : setHelperText('Invalid password');
        setTimeout(() => setHelperText(''), 2000);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form className="mt-4">
        <div className="w-72">
          <label htmlFor="eMailField" className="font-bold">
            eMail
          </label>

          <input
            type="text"
            id="eMailField"
            value={email}
            className="mt-1 rounded-lg h-8 w-full list"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
          />
        </div>
        <div className="mt-4 w-72">
          <label htmlFor="passwordField" className="font-bold">
            Password
          </label>

          <input
            type="password"
            id="passwordField"
            value={password}
            className="mt-1 outline-none rounded-lg w-full h-8 list"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={!signUp ? handleSignIn : handleSignUp}
          className="border py-1 rounded-lg mt-4 w-full font-bold"
        >
          {!signUp ? 'Sign In' : 'Sign Up'}
        </button>
        {helperText}
        <p className="mt-4">
          {!signUp ? "Don't have an account?" : 'Already have an account?'}
          <span
            onClick={() => setSignUp(!signUp)}
            className="font-bold cursor-pointer"
          >
            {signUp ? ' Sign In' : ' Sign Up'}
          </span>
        </p>
      </form>
    </>
  );
};
