import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { WorkItem } from "../components/work-item";
import { db } from "../firebase";
import { WorkModel } from "../model/Work";

export const Work = () => {
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
  };
  useEffect(() => {
    fetchWorks();
  }, []);
  return (
    <>
      {works.map((work) => (
        <WorkItem key={work.workNum} {...work} />
      ))}
    </>
  );
};
