import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";

export const WorkInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "works"), {
        userId: user.uid,
        createdAt: Date.now(),
        workNum: num,
        workTitle: title,
        workDetail: detail,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `works/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setNum(null);
      setTitle("");
      setDetail("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "num") {
      const numberValue = value === "" ? null : parseInt(value, 10);
      if (numberValue !== null && !isNaN(numberValue)) {
        setNum(numberValue);
      } else {
        setNum(null);
      }
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "detail") {
      setDetail(value);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col px-12 py-0">
        <div className="flex justify-center">
          <h1 className="text-4xl">作品入力</h1>
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="num">作品番号</label>
          <input
            type="number"
            name="num"
            value={num ?? ""}
            onChange={onChange}
            className="text-black mt-3 border-2 border-solid border-sky-50 rounded-l text-base focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="title">作品名</label>
          <input
            type="text"
            name="title"
            onChange={onChange}
            className="text-black mt-3 border-2 border-solid border-sky-50 rounded-l text-base focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="detail">作品説明</label>
          <textarea
            name="detail"
            cols={30}
            rows={10}
            onChange={onChange}
            className="text-black mt-3 border-2 border-solid border-sky-50 rounded-l text-base focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <input type="file" onChange={onFileChange} className="my-4" />
        <input
          type="submit"
          value={isLoading ? "Loading" : "提出"}
          className="px-1 py-2 border-none text-base text-white bg-blue-500 rounded-xl cursor-pointer hover:opacity-80"
        />
      </form>
    </>
  );
};
