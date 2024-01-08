import { deleteDoc, doc } from "firebase/firestore";
import { WorkModel } from "../model/Work";
import { db } from "../firebase";

export const WorkItem = ({
  id,
  workNum,
  workTitle,
  workDetail,
  photo,
}: WorkModel & { onDelete: (id: string) => Promise<void> }) => {
  const onDelete = async() => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    try {
     await deleteDoc(doc(db, "works", id))
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  return (
    <>
      <div className="flex flex-col p-5 m-4 border-solid">
        <span>作品番号:{workNum}</span>
        <span>タイトル：{workTitle}</span>
        <span>説明：{workDetail}</span>
        <img src={photo} className="w-28 h-28 rounded-sm" />
        <div className="flex justify-between m-1">
          <button className="px-1 bg-blue-500 cursor-pointer hover:opacity-80">詳細</button>
          <button onClick={onDelete} className="px-1 bg-red-500 cursor-pointer hover:opacity-80">削除</button>
        </div>
      </div>
    </>
  );
};
