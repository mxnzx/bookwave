import * as S from "./BookComponent.styles";
import { useNavigate } from "react-router-dom";

interface BookComponentProps {
    todayBookId: number;
    todayBookTitle: string;
    todayBookAuthor: string;
    todayBookImgUrl: string;
}

function BookComponent({ todayBookId, todayBookTitle, todayBookAuthor, todayBookImgUrl }: BookComponentProps) {
    const navigate = useNavigate();
    const BookDetail = () => {
        navigate(`/bookdetail/${todayBookId}`);
    };

    return (
        <S.Container>
            <S.TodayBookFirst>BookWave 오늘의 책</S.TodayBookFirst>
            <S.BookImage onClick={BookDetail}>
                <img src={todayBookImgUrl} alt="Book Cover" />
                <S.CardUnderLine />
            </S.BookImage>
            <S.BookInfo>
                <S.TodayBookSecond>BookWave 오늘의 책</S.TodayBookSecond>
                <S.BookTitle>{todayBookTitle}</S.BookTitle>
                <S.Author>{todayBookAuthor}</S.Author>
            </S.BookInfo>
        </S.Container>
    );
}

export default BookComponent;