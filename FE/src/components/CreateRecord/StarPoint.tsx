import * as S from './StarPoint.styles'; // 스타일 파일을 불러옴
import { Rating } from 'react-custom-rating-component';

interface StarPointProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

function StarPoint({ rating, onRatingChange }: StarPointProps) {
  return (
    <S.Container>
      <S.Top>
        <S.HeaderText >
          별점을 선택하세요
        </S.HeaderText>
      </S.Top>
      <S.Bottom>
        <Rating
          size='35px'
          spacing='3px'
          activeColor='gold'
          defaultValue={rating}
          precision={0.5}
          onChange={onRatingChange}
        />
      </S.Bottom>
      {/* min-width: 500px 처리 */}
      <S.Bottom2>
        <Rating
          size='50px'
          spacing='10px'
          activeColor='gold'
          defaultValue={rating}
          precision={0.5}
          onChange={onRatingChange}
        />
      </S.Bottom2>
    </S.Container>
  );
}

export default StarPoint;
