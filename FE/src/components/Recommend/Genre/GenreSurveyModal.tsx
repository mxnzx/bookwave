import React, { useState } from "react";
import { fetchGenre, postGenre } from "../../../apis";
import { useQuery } from '@tanstack/react-query';
import swal from "sweetalert";
import * as S from "./GenreSurveyModal.styles";
import IT from "../../../assets/icons/컴퓨터.png";
import 인문학 from "../../../assets/icons/인문학.png";
import 문학 from "../../../assets/icons/문학.png";
import 만화 from "../../../assets/icons/만화.png";
import 예술 from "../../../assets/icons/예술.png";
import 취미 from "../../../assets/icons/취미.png";
import 육아 from "../../../assets/icons/육아.png";
import 사회과학 from "../../../assets/icons/사회과학2.png";
import 역사 from "../../../assets/icons/역사4.png";
import 과학 from "../../../assets/icons/과학.png";
import 경제 from "../../../assets/icons/경제.png";
import 자기계발 from "../../../assets/icons/자기계발.png";

interface GenreSurveyProps {
  onConfirm: () => void;  // 콜백 prop 정의
}

type GenreItem = {
  name: string;
  id: number;
};

type GenreListType = {
  genreDictList: GenreItem[];
};

type GenreIconTypes = {
  [key: string]: string;
};
const genreVariants = {
  normal: {
    color: "#064469",
    backgroundColor: "#F4F4F4",
  },
  hover: {
    color: "white",
    backgroundColor: "#064469",
  },
  active: {
    color: "white",
    backgroundColor: "#064469",
  },
};
const GenreSurveyModal: React.FC<GenreSurveyProps> = ({ onConfirm = () => { } }) => {
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const memberId = Number(localStorage.getItem("memberId"));
  const genreIcons: GenreIconTypes = {
    IT: IT,
    사회과학: 사회과학,
    자기계발: 자기계발,
    역사: 역사,
    문학: 문학,
    육아: 육아,
    예술: 예술,
    취미: 취미,
    인문학: 인문학,
    과학: 과학,
    만화: 만화,
    "경제/경영": 경제,
  };

  // 장르 불러오기 react-query
  const {
    data: GenreList,
    isLoading,
    isError,
  } = useQuery<GenreListType, Error>(
    ['genreData', memberId],
    () => fetchGenre(memberId)
  );
  console.log(GenreList, "장르 불러오기 데이터");
  // 선호 장르 선택
  const handleClick = (genreId: number) => {
    if (selectedGenre.includes(genreId)) {
      setSelectedGenre(selectedGenre.filter((type) => type !== genreId));
    } else {
      if (selectedGenre.length < 3) {
        setSelectedGenre([...selectedGenre, genreId]);
      } else {
        swal("INFO", "최대 3개의 장르만 선택 가능합니다.", "info");
      }
    }
  };
  
  const handlePostGenre = async () => {
    try {
      await postGenre(memberId, selectedGenre);
      swal({
        title: "선호 장르 등록이 완료되었습니다.",
        icon: "success",
        buttons: {
          confirm: {
            text: "확인",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
    });
      onConfirm();
    } catch (error) {
      console.error("Error posting genres:", error);
      swal("Error", "Failed to post genres.", "error");
    }
  };
  console.log(selectedGenre);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !GenreList) {
    return <div>Error fetching genres</div>;
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <S.Overlay onClick={handleClickOutside}>
      <S.ModalWrapper onClick={e => e.stopPropagation()}>
        <S.Container>
          <S.Wrapper>
            <S.TitleBox><S.Title>관심있는 <S.Title>장르</S.Title>를 선택해주세요</S.Title><S.Text>(최대 3개)</S.Text></S.TitleBox>
            <S.GenreWrap>
              {GenreList.genreDictList.map(
                (item: GenreItem | null, index: number) => {
                  if (!item) return null;
                  return (
                    <S.GenreBox
                      key={index}
                      onClick={() => handleClick(item.id)}
                      variants={genreVariants}
                      initial="normal"
                      whileHover="hover"
                      animate={
                        selectedGenre.includes(item.id) ? "active" : "normal"
                      }
                    >
                      <S.GenreIcon src={genreIcons[item.name]} />
                      <S.GenreName>{item.name}</S.GenreName>
                    </S.GenreBox>
                  );
                }
              )}
            </S.GenreWrap>
            <S.SubmitBox>
              <S.SubmitButton
                onClick={handlePostGenre}
              >
                확인
              </S.SubmitButton>
            </S.SubmitBox>
          </S.Wrapper>
        </S.Container>
      </S.ModalWrapper>
    </S.Overlay>
  );
};
export default GenreSurveyModal;
