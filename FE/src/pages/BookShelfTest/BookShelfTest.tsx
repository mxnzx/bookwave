import React from 'react';
import * as S from "./BookShelfTest.styles";
import { fetchShelf, postBookState } from "../../apis";
import {
  Droppable,
  DragDropContext,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { shelfState } from "../../recoil/book";
import { useQuery } from "@tanstack/react-query";
import { ShelfResponse } from "../../types/types";

function BookShelfTest() {
  const memberId = Number(localStorage.getItem("memberId"));
  const [shelf, setShelf] = useRecoilState(shelfState);
  //책장 정보 받아오기 리액트쿼리
  const {
    data: shelfData,
    isLoading,
    isError,
    refetch,
  } = useQuery<ShelfResponse, Error>(
    ["shelfData", memberId],
    () => fetchShelf(memberId),
    {
      enabled: !!memberId,
      onSuccess: (data) => {
        setShelf({
          wishBookList: data.wishBookList,
          readingBookList: data.readingBookList,
          doneBookList: data.doneBookList,
        });
      },
    }
  );
  const mapStateToNumber: {
    wishBookList: number;
    readingBookList: number;
    doneBookList: number;
    [key: string]: number; // 문자열 인덱스 서명 추가
  } = {
    wishBookList: 0,
    readingBookList: 1,
    doneBookList: 2,
  };


  const onDragEnd = async (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    const sourceBooks = [...(shelf as any)[source.droppableId]];
    const draggedBook = sourceBooks[source.index];
    sourceBooks.splice(source.index, 1);

    if (destination.droppableId === source.droppableId) {
      sourceBooks.splice(destination.index, 0, draggedBook);
      setShelf({
        ...shelf,
        [source.droppableId]: sourceBooks,
      });
    } else {
      const destBooks = [...(shelf as any)[destination.droppableId]];
      destBooks.splice(destination.index, 0, draggedBook);

      // 책 상태 변경 API 호출
      const newState = mapStateToNumber[destination.droppableId];
      try {
        await postBookState(draggedBook.bookId, newState);
        console.log("Book state successfully changed!");

        // API 호출이 성공하면 refetch 수행
        refetch();
      } catch (error) {
        console.error("Error changing book state:", error);
        // API 실패 시 원래 상태로 되돌리는 코드도 필요할 수 있습니다.
      }
    }
  };


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading shelf</p>;

  console.log(shelfData, "shelfData");
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.MainContainer>
        <S.ListContainer>
          {/* 책장 페이지 설명 */}
          <S.ShelfInfo>
            <p>내 책장</p>
            <p>나만의 책장을 채워보세요.</p>
          </S.ShelfInfo>

          {/* 각 책장 카테고리마다의 반복 처리 */}
          {Object.entries(shelfData).map(([key, bookList]) => (
            <S.ShelfContainer key={key}>
              <S.TitleWrapper>
                <S.TitleInfo>
                  {key === "wishBookList" && "읽고 싶은 책"}
                  {key === "readingBookList" && "읽고 있는 책"}
                  {key === "doneBookList" && "다 읽은 책"}
                </S.TitleInfo>
              </S.TitleWrapper>

              <Droppable droppableId={key} direction="horizontal">
                {(provided) => (
                  <S.BookWrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <S.BookList>
                      {bookList.map((element, index) => (
                        <Draggable
                          key={element.bookId}
                          draggableId={String(element.bookId)}
                          index={index}
                        >
                          {(provided) => (
                            <S.BookContainer
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <S.BookImg>
                                <img
                                  src={element.bookImageUrl}
                                  alt="book cover"
                                ></img>
                              </S.BookImg>
                            </S.BookContainer>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </S.BookList>
                    {key === "wishBookList" && <S.WishShelf />}
                    {key === "readingBookList" && <S.ReadingShelf />}
                    {key === "doneBookList" && <S.DoneShelf />}
                  </S.BookWrapper>
                )}
              </Droppable>
            </S.ShelfContainer>
          ))}
        </S.ListContainer>
      </S.MainContainer>
    </DragDropContext>
  );
}
export default BookShelfTest;
