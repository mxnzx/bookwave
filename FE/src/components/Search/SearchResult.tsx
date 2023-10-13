import React, { useEffect, useState } from "react";
import * as S from "./SearchResult.styles";
import { PC, Mobile } from "../../utils/MediaQuery/SearchMQ";
import { useNavigate } from "react-router-dom";
import { searchAttemptedState, searchTextState } from "../../recoil";
import { useRecoilState } from "recoil";
import TextMaxLength from "../Common/TextMaxLength";

interface SearchResultProps {
    orderIndex: number;
    genreIndex: number | null;
    bookList: any[];
}

const PAGE_BUFFER = 1;
const EDGE_PAGES = 1;

function SearchResult({ orderIndex, genreIndex, bookList }: SearchResultProps) {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useRecoilState(searchTextState);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchAttempted, setSearchAttempted] = useRecoilState(searchAttemptedState);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 초기 화면 넓이 설정
    const [ITEMS_PER_PAGE, setItemsPerPage] = useState(() => {
        if (windowWidth <= 600) return 4;
        if (windowWidth <= 800) return 6;
        return 10;
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => {
        if (windowWidth <= 600) setItemsPerPage(4);
        else if (windowWidth <= 800) setItemsPerPage(6);
        else setItemsPerPage(10);
    }, [windowWidth]);

    useEffect(() => {
        setCurrentPage(1);
    }, [genreIndex]);

    // 정렬
    const orderBooks = (orderIndex: number, books: any[]) => {
        const orderedBooks = [...books];
        switch (orderIndex) {
            case 0: // 평점 높은 순
                orderedBooks.sort((a, b) => b.score - a.score);
                break;
            case 1: // 평점 낮은 순
                orderedBooks.sort((a, b) => a.score - b.score);
                break;
            case 2: // 많이 담은 순
                orderedBooks.sort((a, b) => b.bookShelfCnt - a.bookShelfCnt);
                break;
            default:
                break;
        }
        return orderedBooks;
    };

    const orderedData = orderBooks(orderIndex, bookList);
    const filteredData = orderedData.filter(item =>
        (genreIndex === null || item.genre === genreIndex)
    );
    const totalItemsAfterFiltering = filteredData.length; // 필터링 후의 아이템 수
    const totalPage = Math.ceil(totalItemsAfterFiltering / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getVisiblePages = () => {
        const visiblePages = [];

        for (let i = 1; i <= totalPage; i++) {
            if (i <= EDGE_PAGES || i > totalPage - EDGE_PAGES) {
                visiblePages.push(i);
            } else if (i >= currentPage - PAGE_BUFFER && i <= currentPage + PAGE_BUFFER) {
                visiblePages.push(i);
            }
        }
        return visiblePages;
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handleBookClick = (bookId: number) => {
        navigate(`/bookdetail/${bookId}`);
    }

    return (
        <S.Container>
            {bookList.length === 0 && searchText && searchAttempted ? (
                <S.NoResultsMessage>검색 결과가 없습니다.</S.NoResultsMessage>
            ) : (
                <>
                    <PC>
                        <S.Body>
                            {currentPageData.map(item => (
                                <S.Item key={item.bookId} onClick={() => handleBookClick(item.bookId)}>
                                    <S.BookImage src={item.bookImageUrl} />
                                    <S.CardUnderLine />
                                    <S.BookTitle>
                                        <TextMaxLength text={item.bookTitle} maxLength={8} />
                                    </S.BookTitle>
                                    <S.BookAuthor>
                                        <TextMaxLength text={item.author} maxLength={10} />
                                    </S.BookAuthor>
                                </S.Item>
                            ))}
                        </S.Body>
                    </PC>
                    <Mobile>
                        <S.Body>
                            {currentPageData.map(item => (
                                <S.BookImage key={item.bookId} src={item.bookImageUrl} alt={item.bookTitle} />
                            ))}
                        </S.Body>
                    </Mobile>
                    <S.Bottom>
                        <S.Pagination>
                            {getVisiblePages().map((page, index, array) => (
                                <React.Fragment key={page}>
                                    <S.PageButton onClick={() => handlePageChange(page)} active={page === currentPage}>
                                        {page}
                                    </S.PageButton>
                                    {(index < array.length - 1 && array[index + 1] - page > 1) && <span>...</span>}
                                </React.Fragment>
                            ))}
                        </S.Pagination>
                    </S.Bottom>
                </>
            )}
        </S.Container>
    );
}

export default SearchResult;

