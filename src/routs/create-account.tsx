import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, { displayName: name });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
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
          <h1 className="text-5xl">Join in!</h1>
          <form
            onSubmit={onSubmit}
            className="mt-12 flex flex-col gap-2 w-full"
          >
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={name}
              required
              placeholder="ユーザー名"
              className="px-1 py-2 rounded-xl border-none text-base text-black"
            />
            <input
              onChange={onChange}
              type="email"
              name="email"
              value={email}
              required
              placeholder="メールアドレス"
              className="px-1 py-2 rounded-xl border-none text-base text-black"
            />
            <input
              onChange={onChange}
              type="password"
              name="password"
              value={password}
              required
              placeholder="パスワード"
              className="px-1 py-2 rounded-xl border-none text-base text-black"
            />
            <input
              type="submit"
              value={isLoading ? "Loading..." : "アカウント作成"}
              className="px-1 py-2 rounded-xl border-none text-base text-white bg-blue-500 cursor-pointer hover:opacity-80"
            />
          </form>
          {err !== "" ? (
            <span className="text-red-500 font-bold">{err}</span>
          ) : null}
        </div>
      </div>
    </>
  );
};
