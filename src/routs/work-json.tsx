import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { WorkModel } from "../model/Work";

export const WorkJson = () => {
  const [works, setWorks] = useState<WorkModel[]>([]);
  const fetchWorks = async () => {
    const worksQuery = query(
      collection(db, "works"),
      orderBy("workNum", "asc")
    );
    const snapshot = await getDocs(worksQuery);
    const works = snapshot.docs.map((doc) => {
      const { workNum, workTitle, workDetail, userId, photo, createdAt } =
        doc.data();
      return {
        workNum,
        workTitle,
        workDetail,
        userId,
        photo,
        createdAt,
        id: doc.id,
      };
    });
    setWorks(works);
    console.log(works);
  };
  useEffect(() => {
    fetchWorks();
  }, []);
  const downLoadJson = (works: any) => {
    const jsonString = JSON.stringify(works, null, 2);
    
    const blob = new Blob([jsonString], { type: "application/json" });
    
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "works.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div>
        <div className="flex justify-end">
          <button
            onClick={() => downLoadJson(works)}
            className="mx-8 my-4 bg-blue-600 p-2 rounded-md cursor-pointer hover:opacity-80"
          >
            Jsonダウンロード
          </button>
        </div>
        {works.map((work, index) => (
          <div key={index}>
            <pre>{JSON.stringify(work, null, 2)}</pre>
          </div>
        ))}
      </div>
    </>
  );
};
