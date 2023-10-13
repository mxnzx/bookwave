import * as S from "./ProfileRecord.styles";
import { useQuery } from "@tanstack/react-query";
import { fetchMemoRecord } from "../../../apis";
import RecordDetail from "../../modals/RecordDetailModal/RecordDetail";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Record {
  recordImageUrl: string;
  recordId: number;
}

interface IRecordData {
  myPageRecords: Record[];
}

const ProfileRecord = () => {
  const { id: userSeqString } = useParams<{ id: string }>();
  const userSeq = Number(userSeqString);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const handleRecordClick = (recordId: number) => {
    setSelectedRecordId(recordId);
    setIsModalOpen(true);
  };


  const { data: recordData, isError, isLoading } = useQuery<IRecordData>(['memoRecord', userSeq], () => fetchMemoRecord(userSeq));
  // console.log(recordData, "레코드 데이터");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading book detail</p>;


  return (
    <S.FeedGrid>
      {recordData.myPageRecords.slice().reverse().map((item) =>
        <S.FeedBox key={item.recordId} onClick={() => handleRecordClick(item.recordId)}>
          <S.FeedImg src={item.recordImageUrl} />
        </S.FeedBox>)}
      {selectedRecordId !== null && (
        <RecordDetail 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recordId={selectedRecordId}
          userSeq={userSeq}
        />
      )}
    </S.FeedGrid>
  );
};
export default ProfileRecord;
