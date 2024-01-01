import React, { useState } from "react";

export const WorkInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (e) {
    } finally {
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
        <input type="file" className="my-4" />
        <input
          type="submit"
          value="提出"
          className="px-1 py-2 border-none text-base text-white bg-blue-500 rounded-xl cursor-pointer hover:opacity-80"
        />
      </form>
    </>
  );
};
