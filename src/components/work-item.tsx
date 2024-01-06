import { WorkModel } from "../model/Work";

export const WorkItem = ({
  workNum,
  workTitle,
  workDetail,
  photo,
}: WorkModel) => {
  return (
    <>
      <div className="flex flex-col p-5 border-solid">
        <span>作品番号:{workNum}</span>
        <span>タイトル：{workTitle}</span>
        <span>説明：{workDetail}</span>
        <img src={photo} className="w-24 h-24 rounded-sm" />
      </div>
    </>
  );
};
