import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setErr(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="h-full flex flex-col items-center w-1/4 px-12 py-0">
          <h1 className="text-5xl">Login In !</h1>
          <form
            onSubmit={onSubmit}
            className="mt-12 flex flex-col gap-2 w-full"
          >
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="メールアドレス"
              className="px-1 py-2 rounded-xl text-base text-black"
            />
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="パスワード"
              className="px-1 py-2 rounded-xl text-base text-black"
            />
            <input
              type="submit"
              value={isLoading ? "Loading..." : "ログイン"}
              className="px-1 py-2 border-none text-base text-white bg-blue-500 rounded-xl cursor-pointer hover:opacity-80"
            />
          </form>
          {err !== "" ? <span className="text-red-500 font-bold">{err}</span> : null}
        </div>
      </div>
    </>
  );
};
