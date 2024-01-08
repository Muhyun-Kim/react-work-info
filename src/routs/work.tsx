import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { WorkItem } from "../components/work-item";
import { auth, db } from "../firebase";
import { WorkModel } from "../model/Work";

export const Work = () => {
  const [works, setWorks] = useState<WorkModel[]>([]);
  const fetchWorks = async () => {
    try {
      const worksQuery = query(
        collection(db, "works"),
        where("userId", "==", auth.currentUser!.uid),
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
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchWorks();
  }, []);
  const handleDelete = async (id:string) => {
    const ok = confirm("Are you sure you want to delete this work?");
    if (ok) {
      try {
        await deleteDoc(doc(db, "works", id));
        setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      {works.map((work) => (
        <WorkItem key={work.workNum} onDelete={handleDelete} {...work} />
      ))}
    </>
  );
};
