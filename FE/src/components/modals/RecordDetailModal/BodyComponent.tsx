import * as S from "./BodyComponent.styles";
import star from "../../../assets/icons/star.png";

interface props {
  recordTitle: string;
  period: number;
  score: number;
  recordContent: string;
}

function BodyComponent({ recordTitle, period, score, recordContent }: props) {
  return (
    <S.Container>
      {/* <S.Top>
        <S.TopBox>
          <S.BookInfoWrap> */}
            {/* <S.BookInfoBox>
              <S.BookInfoTitle>독서기간</S.BookInfoTitle>
              <S.BookInfoContent> {period <= 0 ? "하루 미만" : `${period}일`}</S.BookInfoContent>
            </S.BookInfoBox>
            <S.BookInfoBox>
              <S.BookInfoTitle>별점</S.BookInfoTitle>
              <S.BookInfoContent>
                <S.StarIcon src={star} />
                {score.toFixed(1)}
              </S.BookInfoContent>
            </S.BookInfoBox> */}
          {/* </S.BookInfoWrap>
        </S.TopBox>
      </S.Top> */}
      <S.Hr></S.Hr>
      <S.Title>
        {/* <S.DashedLine>{Array(15).fill("-").join("")}</S.DashedLine> */}
        {recordTitle}
        {/* <S.DashedLine>{Array(15).fill("-").join("")}</S.DashedLine> */}
      </S.Title>
      <S.InfoContainer>
        <S.BookInfoBox>
                <S.BookInfoTitle>독서기간 <span>{period <= 0 ? "하루 미만" : `${period}일`}</span></S.BookInfoTitle>
                <S.BookInfoTitle>별점 <span><S.StarIcon src={star} />
                  {score.toFixed(1)}</span></S.BookInfoTitle>
        </S.BookInfoBox>
      </S.InfoContainer>
      
      <S.Main>{recordContent}</S.Main>
    </S.Container>
  );
}

export default BodyComponent;
