import { useNavigate } from "react-router-dom";
import * as S from "./BookComponent.styles";

interface Props {
    bookId: number;
    bookTitle: string; 
    bookAuthor: string;
    recordImageUrl: string;
}

function BookComponent({ bookId, bookTitle, bookAuthor, recordImageUrl }: Props) {
    const navigate = useNavigate();

    const BookDetail = () => {
        navigate(`/bookdetail/${bookId}`);
    };

    return (
        <S.Container>
            <S.BookImage onClick={BookDetail}>
                <img src={recordImageUrl} />
            </S.BookImage>
            <S.BookInfo>
                <S.BookTitle>{bookTitle}</S.BookTitle>
                <S.Author>{bookAuthor}</S.Author>
            </S.BookInfo>
        </S.Container>
    );
}

export default BookComponent;
